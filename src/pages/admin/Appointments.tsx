import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from '../services-api/appointmentService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminAppointments = () => {
  const queryClient = useQueryClient();
  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: getAppointments
  });
  const [selected, setSelected] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);

  const createMutation = useMutation<any, Error, any>({
    mutationFn: createAppointment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['appointments'] })
  }
  );
  const updateMutation = useMutation<any, Error, { id: any; data: any }>({
    mutationFn: ({ id, data }) => updateAppointment(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['appointments'] })
  });
  const deleteMutation = useMutation<any, Error, string | number>({
    mutationFn: (id: string | number) => deleteAppointment(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['appointments'] })
  });

  const handleEdit = (appt: any) => {
    setSelected(appt);
    setForm(appt);
    setIsEditing(true);
  };

  const handleDelete = (id: any) => {
    deleteMutation.mutate(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateMutation.mutate({ id: selected.id, data: form });
    } else {
      createMutation.mutate(form);
    }
    setForm({});
    setIsEditing(false);
    setSelected(null);
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
        <p className="text-gray-600">Create, update, and delete appointments.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Appointment' : 'Create Appointment'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-2 mb-6">
            <input
              className="border p-2 rounded w-full"
              placeholder="Patient ID"
              value={form.patientId || ''}
              onChange={e => setForm({ ...form, patientId: e.target.value })}
              required
            />
            <input
              className="border p-2 rounded w-full"
              placeholder="Doctor ID"
              value={form.doctorId || ''}
              onChange={e => setForm({ ...form, doctorId: e.target.value })}
              required
            />
            <input
              className="border p-2 rounded w-full"
              placeholder="Date (YYYY-MM-DD)"
              value={form.date || ''}
              onChange={e => setForm({ ...form, date: e.target.value })}
              required
            />
            <input
              className="border p-2 rounded w-full"
              placeholder="Time (HH:mm)"
              value={form.time || ''}
              onChange={e => setForm({ ...form, time: e.target.value })}
              required
            />
            <Button type="submit" className="bg-purple-400 hover:bg-purple-500">
              {isEditing ? 'Update' : 'Create'} Appointment
            </Button>
            {isEditing && (
              <Button type="button" variant="outline" onClick={() => { setIsEditing(false); setForm({}); setSelected(null); }}>
                Cancel
              </Button>
            )}
          </form>
          <h2 className="font-semibold mb-2">All Appointments</h2>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <ul className="divide-y">
              {appointments.map((appt: any) => (
                <li key={appt.id} className="py-2 flex justify-between items-center">
                  <div>
                    <div>Patient: {appt.patientId} | Doctor: {appt.doctorId}</div>
                    <div className="text-xs text-gray-500">{appt.date} {appt.time}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(appt)}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(appt.id)}>Delete</Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminAppointments;
