import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from '../services-api/appointmentService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getDoctorAppointments } from '../services-api/doctorService';

const DoctorDashboard = ({ doctorId }: { doctorId: string | number }) => {
  const queryClient = useQueryClient();
  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['doctor-appointments', doctorId],
    queryFn: () => getDoctorAppointments(doctorId)
  });
  const [selected, setSelected] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);

  const createMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['doctor-appointments', doctorId] })
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string | number, data: any }) => updateAppointment(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['doctor-appointments', doctorId] })
  });
  const deleteMutation = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['doctor-appointments', doctorId] })
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
      createMutation.mutate({ ...form, doctorId });
    }
    setForm({});
    setIsEditing(false);
    setSelected(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Doctor Dashboard</h1>
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
            <Button type="submit" className="bg-blue-400 hover:bg-blue-500">
              {isEditing ? 'Update' : 'Create'} Appointment
            </Button>
            {isEditing && (
              <Button type="button" variant="outline" onClick={() => { setIsEditing(false); setForm({}); setSelected(null); }}>
                Cancel
              </Button>
            )}
          </form>
          <h2 className="font-semibold mb-2">My Appointments</h2>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <ul className="divide-y">
              {appointments.map((appt: any) => (
                <li key={appt.id} className="py-2 flex justify-between items-center">
                  <div>
                    <div>Patient: {appt.patientId}</div>
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
    </div>
  );
};

export default DoctorDashboard;
