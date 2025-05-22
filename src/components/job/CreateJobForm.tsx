
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateJobForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    contractType: '',
    department: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileUploaded(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Here you would normally submit to an API or backend
      console.log("Job posting data:", formData);
      console.log("File uploaded:", fileUploaded);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Offre créée",
        description: "L'offre d'emploi a été créée avec succès.",
      });
      
      // Navigate back to job postings page
      navigate('/job-postings');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de l'offre.",
        variant: "destructive",
      });
      console.error("Error creating job:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ml-64 p-8 bg-[#F9FAFB]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Créer une offre d'emploi</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Titre du poste</Label>
                <Input 
                  id="title"
                  name="title"
                  placeholder="Développeur Full Stack"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Lieu</Label>
                <Input 
                  id="location"
                  name="location"
                  placeholder="Paris"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contractType">Type de contrat</Label>
                  <Select
                    value={formData.contractType}
                    onValueChange={(value) => handleSelectChange('contractType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CDI">CDI</SelectItem>
                      <SelectItem value="CDD">CDD</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                      <SelectItem value="Stage">Stage</SelectItem>
                      <SelectItem value="Alternance">Alternance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Département</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => handleSelectChange('department', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="—" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  placeholder="Glissez-les missionnss, les compétences requises, etc."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="min-h-[120px]"
                  required
                />
              </div>
              
              <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
                <label className="flex flex-col items-center cursor-pointer gap-2">
                  <FileText className="h-6 w-6 text-gray-400" />
                  <span className="text-gray-600">
                    {fileUploaded ? fileUploaded.name : "Glissez-déposez votre fiche de poste ici"}
                  </span>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange} 
                    accept=".pdf,.doc,.docx"
                  />
                </label>
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white w-32"
                  disabled={isLoading}
                >
                  {isLoading ? "Création..." : "Créer"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJobForm;
