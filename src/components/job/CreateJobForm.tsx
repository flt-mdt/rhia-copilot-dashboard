
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Import } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateJobPosting } from "@/hooks/useJobPostings";
import { useAuth } from "@/contexts/AuthContext";
import { useJobDrafts } from "@/hooks/useJobDrafts";
import { useJobTemplates } from "@/hooks/useJobTemplates";

const CreateJobForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const createJobMutation = useCreateJobPosting();
  const { drafts } = useJobDrafts();
  const { templates, incrementUsage } = useJobTemplates();
  
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    contract_type: '',
    department: '',
    description: '',
    experience_level: '',
    salary_min: '',
    salary_max: ''
  });
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);

  // Check for template data in localStorage on component mount
  useEffect(() => {
    const savedTemplate = localStorage.getItem('selectedJobTemplate');
    if (savedTemplate) {
      try {
        const templateData = JSON.parse(savedTemplate);
        setFormData(prev => ({
          ...prev,
          title: templateData.title || '',
          description: templateData.description || '',
          department: templateData.department || '',
          experience_level: templateData.experienceLevel || ''
        }));
        
        localStorage.removeItem('selectedJobTemplate');
        
        toast({
          title: "Modèle importé",
          description: "Les données du modèle ont été appliquées au formulaire"
        });
      } catch (error) {
        console.error('Error parsing template data:', error);
      }
    }
  }, [toast]);

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

  const handleImportDraft = (draftId: string) => {
    const draft = drafts.find(d => d.id === draftId);
    if (draft) {
      setFormData({
        title: draft.title,
        location: draft.location || '',
        contract_type: draft.contract_type || '',
        department: '', // Not in draft schema
        description: draft.description || '',
        experience_level: '',
        salary_min: '',
        salary_max: ''
      });
      
      toast({
        title: "Brouillon importé",
        description: "Les données du brouillon ont été appliquées au formulaire"
      });
    }
  };

  const handleImportTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setFormData({
        title: template.title,
        location: '',
        contract_type: '',
        department: template.department || '',
        description: template.description || '',
        experience_level: template.experience_level || '',
        salary_min: '',
        salary_max: ''
      });
      
      incrementUsage(templateId);
      
      toast({
        title: "Modèle importé",
        description: "Les données du modèle ont été appliquées au formulaire"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const jobData = {
        title: formData.title,
        location: formData.location,
        contract_type: formData.contract_type as any,
        department: formData.department as any,
        description: formData.description,
        experience_level: formData.experience_level,
        salary_min: formData.salary_min ? parseInt(formData.salary_min) : undefined,
        salary_max: formData.salary_max ? parseInt(formData.salary_max) : undefined,
        created_by: user?.id
      };

      await createJobMutation.mutateAsync(jobData);
      navigate('/job-postings');
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <div className="transition-all duration-300 ease-in-out p-4 sm:p-6 lg:p-8 bg-[#F9FAFB] min-h-screen"
         style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">Créer une offre d'emploi</h1>
        </div>
        
        {/* Import Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="import-draft" className="text-sm font-medium">Importer un brouillon existant</Label>
              <Select onValueChange={handleImportDraft}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner un brouillon" />
                </SelectTrigger>
                <SelectContent>
                  {drafts.map((draft) => (
                    <SelectItem key={draft.id} value={draft.id}>
                      {draft.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="import-template" className="text-sm font-medium">Importer un modèle public</Label>
              <Select onValueChange={handleImportTemplate}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner un modèle" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.title} {template.is_featured && "⭐"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">Titre du poste</Label>
                <Input 
                  id="title"
                  name="title"
                  placeholder="Développeur Full Stack"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">Lieu</Label>
                <Input 
                  id="location"
                  name="location"
                  placeholder="Paris"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contract_type" className="text-sm font-medium">Type de contrat</Label>
                  <Select
                    value={formData.contract_type}
                    onValueChange={(value) => handleSelectChange('contract_type', value)}
                  >
                    <SelectTrigger className="w-full">
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
                  <Label htmlFor="department" className="text-sm font-medium">Département</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => handleSelectChange('department', value)}
                  >
                    <SelectTrigger className="w-full">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="salary_min" className="text-sm font-medium">Salaire minimum (€)</Label>
                  <Input 
                    id="salary_min"
                    name="salary_min"
                    type="number"
                    placeholder="40000"
                    value={formData.salary_min}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="salary_max" className="text-sm font-medium">Salaire maximum (€)</Label>
                  <Input 
                    id="salary_max"
                    name="salary_max"
                    type="number"
                    placeholder="60000"
                    value={formData.salary_max}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience_level" className="text-sm font-medium">Niveau d'expérience</Label>
                <Select
                  value={formData.experience_level}
                  onValueChange={(value) => handleSelectChange('experience_level', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Junior (0-2 ans)">Junior (0-2 ans)</SelectItem>
                    <SelectItem value="Confirmé (3-5 ans)">Confirmé (3-5 ans)</SelectItem>
                    <SelectItem value="Senior (5+ ans)">Senior (5+ ans)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  placeholder="Décrivez les missions, les compétences requises, etc."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="min-h-[120px] w-full resize-y"
                  required
                />
              </div>
              
              <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                <label className="flex flex-col items-center cursor-pointer gap-3">
                  <FileText className="h-8 w-8 text-gray-400" />
                  <span className="text-gray-600 text-sm sm:text-base">
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
              
              <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  type="submit" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto px-8"
                  disabled={createJobMutation.isPending}
                >
                  {createJobMutation.isPending ? "Création..." : "Créer"}
                </Button>
                
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/job-postings')}
                  className="w-full sm:w-auto"
                >
                  Annuler
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
