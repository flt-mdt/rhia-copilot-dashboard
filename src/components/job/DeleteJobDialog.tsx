
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface DeleteJobDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  jobTitle: string;
  candidatesCount: number;
  isDeleting: boolean;
}

const DeleteJobDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  jobTitle, 
  candidatesCount, 
  isDeleting 
}: DeleteJobDialogProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <DialogTitle className="text-lg font-semibold">
              {t('jobs.deleteConfirmTitle')}
            </DialogTitle>
          </div>
          <DialogDescription className="text-left mt-4">
            {t('jobs.deleteConfirmMessage')
              .replace('{jobTitle}', jobTitle)
              .replace('{candidatesCount}', candidatesCount.toString())}
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-4">
          <p className="text-sm text-red-800 font-medium">
            {t('jobs.deleteWarning')}
          </p>
          <ul className="text-sm text-red-700 mt-2 list-disc list-inside">
            <li>{t('jobs.deleteWarningJob')}</li>
            <li>{t('jobs.deleteWarningCandidates')}</li>
            <li>{t('jobs.deleteWarningData')}</li>
          </ul>
        </div>

        <DialogFooter className="mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            {t('common.cancel')}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? t('common.deleting') : t('jobs.confirmDelete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteJobDialog;
