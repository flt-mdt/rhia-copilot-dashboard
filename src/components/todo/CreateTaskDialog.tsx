import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Calendar, Star, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { TaskTag } from '@/hooks/useRecruiterTasks';

interface CreateTaskDialogProps {
  tags: TaskTag[];
  onCreateTask: (taskData: {
    title: string;
    description?: string;
    candidate_name: string;
    priority: boolean;
    due_date?: string;
    selectedTags: string[];
  }) => void;
}

const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({ tags, onCreateTask }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [priority, setPriority] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !candidateName.trim()) {
      console.log('Validation failed: missing title or candidate name');
      return;
    }

    if (isSubmitting) {
      console.log('Already submitting, ignoring');
      return;
    }

    setIsSubmitting(true);
    console.log('Submitting task creation...');

    try {
      await onCreateTask({
        title: title.trim(),
        description: description.trim() || undefined,
        candidate_name: candidateName.trim(),
        priority,
        due_date: dueDate || undefined,
        selectedTags
      });

      // Reset form only on success
      setTitle('');
      setDescription('');
      setCandidateName('');
      setPriority(false);
      setDueDate('');
      setSelectedTags([]);
      setOpen(false);
      console.log('Task creation completed successfully');
    } catch (error) {
      console.error('Task creation failed:', error);
      // Keep form open on error so user can retry
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const tagsByCategory = tags.reduce((acc, tag) => {
    if (!acc[tag.category]) acc[tag.category] = [];
    acc[tag.category].push(tag);
    return acc;
  }, {} as Record<string, TaskTag[]>);

  const categoryLabels = {
    process: 'Processus de recrutement',
    urgency: 'Urgence',
    type: 'Type de poste',
    custom: 'Personnalisé'
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle tâche</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Titre de la tâche *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Appeler Sandra pour retour entretien"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="candidate">Nom du candidat *</Label>
            <Input
              id="candidate"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Ex: Sandra Martin"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Détails supplémentaires sur la tâche..."
              rows={3}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="dueDate">Date d'échéance</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-8">
              <Checkbox
                id="priority"
                checked={priority}
                onCheckedChange={(checked) => setPriority(checked as boolean)}
              />
              <Label htmlFor="priority" className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                Priorité haute
              </Label>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              Tags
            </Label>
            {Object.entries(tagsByCategory).map(([category, categoryTags]) => (
              <div key={category} className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">
                  {categoryLabels[category as keyof typeof categoryLabels] || category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {categoryTags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        selectedTags.includes(tag.id) 
                          ? `bg-${tag.color}-500 text-white hover:bg-${tag.color}-600` 
                          : `border-${tag.color}-300 text-${tag.color}-700 hover:bg-${tag.color}-50`
                      }`}
                      onClick={() => toggleTag(tag.id)}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={!title.trim() || !candidateName.trim() || isSubmitting}
            >
              {isSubmitting ? 'Création...' : 'Créer la tâche'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
