/**
 * Downscale + JPEG-encode images in the browser so JSON payloads (e.g. data URLs)
 * stay under typical reverse-proxy body limits and avoid 413 Payload Too Large.
 */

const DEFAULT_MAX_EDGE = 1400
const DEFAULT_QUALITY = 0.78
/**
 * Per-image ceiling for base64 length (~200–250KB JPEG) so several images + JSON
 * fields stay under common 1MB proxy limits (avoids 413).
 */
const MAX_DATA_URL_CHARS = 280_000

export function compressRasterToJpegDataUrl(
  source: File | Blob,
  options?: { maxEdge?: number; quality?: number }
): Promise<string> {
  const maxEdge = options?.maxEdge ?? DEFAULT_MAX_EDGE
  const quality = options?.quality ?? DEFAULT_QUALITY

  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(source)
    const img = new Image()
    img.onload = () => {
      try {
        URL.revokeObjectURL(objectUrl)
        let w = img.naturalWidth
        let h = img.naturalHeight
        if (!w || !h) {
          reject(new Error("Invalid image dimensions"))
          return
        }
        const ratio = Math.min(maxEdge / w, maxEdge / h, 1)
        w = Math.max(1, Math.round(w * ratio))
        h = Math.max(1, Math.round(h * ratio))
        const canvas = document.createElement("canvas")
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          reject(new Error("Canvas not available"))
          return
        }
        ctx.drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL("image/jpeg", quality))
      } catch (e) {
        reject(e)
      }
    }
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error("Could not decode image"))
    }
    img.src = objectUrl
  })
}

/** Compress in one or more passes until under ~900k base64 chars (typical 1MB limit headroom). */
export async function fileToUploadableImageDataUrl(
  source: File | Blob
): Promise<string> {
  const passes: { maxEdge: number; quality: number }[] = [
    { maxEdge: 1400, quality: 0.78 },
    { maxEdge: 1200, quality: 0.7 },
    { maxEdge: 960, quality: 0.62 },
    { maxEdge: 800, quality: 0.55 },
    { maxEdge: 640, quality: 0.48 },
    { maxEdge: 512, quality: 0.42 },
  ]

  let last: string | undefined
  for (const { maxEdge, quality } of passes) {
    last = await compressRasterToJpegDataUrl(source, { maxEdge, quality })
    if (last.length <= MAX_DATA_URL_CHARS) return last
  }
  return last!
}
