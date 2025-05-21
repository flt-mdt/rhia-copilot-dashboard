
import { Download, Eye, FileText, File, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Document } from "@/types/candidate";

interface DocumentsSectionProps {
  documents: Document[];
}

const DocumentsSection = ({ documents }: DocumentsSectionProps) => {
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
    console.log(`Downloading: ${document.name}`);
  };

  const handlePreview = (document: Document) => {
    // In a real app, this would open a preview of the file
    console.log(`Previewing: ${document.name}`);
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
              {doc.type === 'mp4' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePreview(doc)}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Lire
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDownload(doc)}
                className="text-gray-600 hover:text-blue-600"
              >
                <Download className="h-4 w-4 mr-1" />
                Télécharger
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DocumentsSection;
