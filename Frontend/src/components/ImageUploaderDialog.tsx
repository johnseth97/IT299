import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import clsx from 'clsx'

interface UploadDialogProps {
  serviceTypeId: number
  expectedCount: number
  open: boolean
  onClose: () => void
  onComplete: (base64List: string[]) => void
}

export function UploadDialog({
  serviceTypeId,
  expectedCount,
  open,
  onClose,
  onComplete,
}: UploadDialogProps) {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter((file) =>
        ['image/jpeg', 'image/png'].includes(file.type)
      )
      setFiles(validFiles.slice(0, expectedCount))
    },
    [expectedCount]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [] },
    multiple: true,
  })

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file))
    setPreviews(urls)
    return () => urls.forEach((url) => URL.revokeObjectURL(url))
  }, [files])

  const handleUpload = async () => {
    setUploading(true)
    const base64List: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()

      const result: string = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      base64List.push(result)
      setProgress(Math.round(((i + 1) / files.length) * 100))
    }

    setUploading(false)
    onComplete(base64List)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Upload {expectedCount} Photo{expectedCount > 1 ? 's' : ''}
          </DialogTitle>
        </DialogHeader>

        <div
          {...getRootProps()}
          className={clsx(
            'border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition',
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          )}
        >
          <input {...getInputProps()} />
          <p>
            {isDragActive
              ? 'Drop your images here...'
              : 'Click or drag to upload JPEG/PNG'}
          </p>
        </div>

        {previews.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`preview-${i}`}
                className="w-full h-24 object-cover rounded"
              />
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2">
          <Label className="text-muted-foreground text-sm">
            Uploaded {files.length} / {expectedCount}
          </Label>

          {uploading && <Progress value={progress} className="h-2" />}

          <Button
            disabled={uploading || files.length !== expectedCount}
            onClick={handleUpload}
          >
            {uploading ? 'Uploading...' : 'Finish Upload'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
