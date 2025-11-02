import { useState, useCallback, FormEvent } from 'react';
import { generateBookingConfirmation } from '../services/geminiService';
import { SERVICES } from '../constants';

interface FormState {
  name: string;
  appliance: string;
  issue: string;
}

export const useBookingForm = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    appliance: SERVICES[0]?.title || '',
    issue: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');

  const setFormField = useCallback((field: keyof FormState, value: string) => {
    setFormState(prevState => ({ ...prevState, [field]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, appliance, issue } = formState;

    if (!name || !appliance || !issue) {
      setError('Please fill out all fields.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setConfirmation('');

    try {
      const result = await generateBookingConfirmation(name, appliance, issue);
      setConfirmation(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sorry, something went wrong. Please try again later.';
      setError(errorMessage);
      console.error('Booking form error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [formState]);

  return {
    formState,
    setFormField,
    handleSubmit,
    isLoading,
    confirmation,
    error,
  };
};
