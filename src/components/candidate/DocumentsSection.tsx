
import { useState } from "react";
import { Download, Eye, FileText, File, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Document } from "@/types/candidate";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface DocumentsSectionProps {
  documents: Document[];
}

const DocumentsSection = ({ documents }: DocumentsSectionProps) => {
  const { toast } = useToast();
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'docx':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'mp4':
        return <Video className="h-6 w-6 text-purple-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  const handleDownload = (document: Document) => {
    // In a real app, this would handle downloading the file
    toast({
      title: "Download started",
      description: `Downloading: ${document.name}`
    });
  };

  const handlePreview = (document: Document) => {
    setPreviewDocument(document);
  };

  return (
    <div className="space-y-4">
      {documents.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">Aucun document disponible</p>
        </div>
      ) : (
        documents.map((doc) => (
          <div 
            key={doc.id}
            className="flex items-center justify-between p-3 border rounded-md bg-white"
          >
            <div className="flex items-center">
              {getFileIcon(doc.type)}
              <span className="ml-3 text-sm font-medium">{doc.name}</span>
              <span className="ml-2 text-xs uppercase font-mono text-gray-500">.{doc.type}</span>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePreview(doc)}
                className="text-gray-600 hover:text-blue-600"
              >
                <Eye className="h-4 w-4 mr-1" />
                {doc.type === 'mp4' ? 'Play' : 'View'}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDownload(doc)}
                className="text-gray-600 hover:text-blue-600"
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
        ))
      )}

      {/* Document Preview Dialog */}
      <Dialog open={!!previewDocument} onOpenChange={() => setPreviewDocument(null)}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>
              {previewDocument?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 h-full overflow-auto bg-gray-100 rounded-md p-4">
            {previewDocument?.type === 'mp4' ? (
              <div className="flex items-center justify-center h-full">
                <div className="bg-black w-full max-w-2xl aspect-video flex items-center justify-center text-white">
                  <p className="text-center">Video Player Would Appear Here</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-200">
                <div className="bg-white p-8 shadow-lg max-w-2xl w-full min-h-[60%]">
                  <div className="flex justify-center items-center h-full">
                    <p className="text-center text-gray-500">
                      Document preview would appear here.<br />
                      In a real application, this would display a PDF or document viewer.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentsSection;
