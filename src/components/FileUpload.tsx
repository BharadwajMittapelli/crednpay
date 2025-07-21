import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, File, X, Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  accept?: string;
  maxSize?: number; // in MB
  multiple?: boolean;
  onUpload?: (files: File[]) => void;
  title?: string;
  description?: string;
}

interface UploadedFile {
  file: File;
  id: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  url?: string;
}

export default function FileUpload({
  accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx',
  maxSize = 10,
  multiple = false,
  onUpload,
  title = 'Upload Proof of Purchase',
  description = 'Upload order confirmation, receipt, or screenshot'
}: FileUploadProps) {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const validFiles: File[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds ${maxSize}MB limit`,
          variant: "destructive"
        });
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    // Simulate upload process
    validFiles.forEach((file) => {
      const fileId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      const uploadedFile: UploadedFile = {
        file,
        id: fileId,
        progress: 0,
        status: 'uploading'
      };

      setUploadedFiles(prev => [...prev, uploadedFile]);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadedFiles(prev => prev.map(f => {
          if (f.id === fileId) {
            const newProgress = Math.min(f.progress + Math.random() * 30, 100);
            if (newProgress >= 100) {
              clearInterval(interval);
              return {
                ...f,
                progress: 100,
                status: 'success',
                url: URL.createObjectURL(file) // Mock URL
              };
            }
            return { ...f, progress: newProgress };
          }
          return f;
        }));
      }, 200);
    });

    if (onUpload) {
      onUpload(validFiles);
    }

    toast({
      title: "Upload started",
      description: `Uploading ${validFiles.length} file(s)`
    });
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <img src={URL.createObjectURL(file)} alt={file.name} className="w-8 h-8 object-cover rounded" />;
    }
    return <File className="w-8 h-8" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <Card 
        className={`border-2 border-dashed transition-colors duration-200 ${
          isDragOver 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="flex flex-col items-center justify-center py-8 px-4">
          <Upload className={`w-12 h-12 mb-4 ${isDragOver ? 'text-primary' : 'text-muted-foreground'}`} />
          
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground text-center mb-4">
            {description}
          </p>
          
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-primary hover-lift"
          >
            Choose Files
          </Button>
          
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Drag and drop files here or click to browse<br />
            Supported formats: {accept.replace(/\./g, '').replace(/,/g, ', ').toUpperCase()}<br />
            Max size: {maxSize}MB per file
          </p>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={accept}
            multiple={multiple}
            onChange={(e) => handleFileSelect(e.target.files)}
          />
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Uploaded Files</h4>
          {uploadedFiles.map((uploadedFile) => (
            <Card key={uploadedFile.id} className="p-4">
              <div className="flex items-center space-x-3">
                {getFileIcon(uploadedFile.file)}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium truncate">{uploadedFile.file.name}</p>
                    <div className="flex items-center space-x-2">
                      {uploadedFile.status === 'success' && (
                        <Badge variant="outline" className="text-success">
                          <Check className="w-3 h-3 mr-1" />
                          Uploaded
                        </Badge>
                      )}
                      {uploadedFile.status === 'error' && (
                        <Badge variant="destructive">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Failed
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(uploadedFile.id)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatFileSize(uploadedFile.file.size)}</span>
                    {uploadedFile.status === 'uploading' && (
                      <span>{Math.round(uploadedFile.progress)}%</span>
                    )}
                  </div>
                  
                  {uploadedFile.status === 'uploading' && (
                    <Progress value={uploadedFile.progress} className="mt-2 h-1" />
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}