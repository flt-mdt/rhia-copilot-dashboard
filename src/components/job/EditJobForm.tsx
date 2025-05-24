
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useJobPosting, useUpdateJobPosting } from "@/hooks/useJobPostings";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from '@/components/layout/Header';

const EditJobForm = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { data: job, isLoading } = useJobPosting(jobId!);
  const updateJobMutation = useUpdateJobPosting();
  
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

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || '',
        location: job.location || '',
        contract_type: job.contract_type || '',
        department: job.department || '',
        description: job.description || '',
        experience_level: job.experience_level || '',
        salary_min: job.salary_min?.toString() || '',
        salary_max: job.salary_max?.toString() || ''
      });
    }
  }, [job]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const updates = {
        title: formData.title,
        location: formData.location,
        contract_type: formData.contract_type as any,
        department: formData.department as any,
        description: formData.description,
        experience_level: formData.experience_level,
        salary_min: formData.salary_min ? parseInt(formData.salary_min) : null,
        salary_max: formData.salary_max ? parseInt(formData.salary_max) : null,
      };

      await updateJobMutation.mutateAsync({ id: jobId!, updates });
      navigate(`/job-postings/${jobId}`);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="ml-64 p-8 bg-[#F9FAFB]">
        <Header title={t('jobs.editJob')} />
        <div className="flex justify-center items-center h-64">
          <p>{t('common.loading')}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-64 p-8 bg-[#F9FAFB]">
      <Header title={t('jobs.editJob')} />
      
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => navigate(`/job-postings/${jobId}`)}
      >
        {t('common.back')}
      </Button>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">{t('jobs.title')}</Label>
                <Input 
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">{t('jobs.location')}</Label>
                <Input 
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contract_type">{t('jobs.contractType')}</Label>
                  <Select
                    value={formData.contract_type}
                    onValueChange={(value) => handleSelectChange('contract_type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('jobs.selectContract')} />
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
                  <Label htmlFor="department">{t('jobs.department')}</Label>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary_min">{t('jobs.salaryMin')}</Label>
                  <Input 
                    id="salary_min"
                    name="salary_min"
                    type="number"
                    value={formData.salary_min}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="salary_max">{t('jobs.salaryMax')}</Label>
                  <Input 
                    id="salary_max"
                    name="salary_max"
                    type="number"
                    value={formData.salary_max}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience_level">{t('jobs.experienceLevel')}</Label>
                <Select
                  value={formData.experience_level}
                  onValueChange={(value) => handleSelectChange('experience_level', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('jobs.selectExperience')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Junior (0-2 ans)">Junior (0-2 ans)</SelectItem>
                    <SelectItem value="Confirmé (3-5 ans)">Confirmé (3-5 ans)</SelectItem>
                    <SelectItem value="Senior (5+ ans)">Senior (5+ ans)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">{t('jobs.description')}</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="min-h-[120px]"
                  required
                />
              </div>
              
              <div className="pt-4 flex gap-4">
                <Button 
                  type="submit" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={updateJobMutation.isPending}
                >
                  {updateJobMutation.isPending ? t('common.saving') : t('common.save')}
                </Button>
                
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => navigate(`/job-postings/${jobId}`)}
                >
                  {t('common.cancel')}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditJobForm;
