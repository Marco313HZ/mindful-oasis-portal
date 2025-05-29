
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentsAPI, doctorsAPI, patientsAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, User, Stethoscope, Plus } from 'lucide-react';

const AdminAppointments = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: appointmentsAPI.getAll
  });
  
  const { data: doctors = [] } = useQuery({
    queryKey: ['doctors'],
    queryFn: doctorsAPI.getAll
  });
  
  const { data: patients = [] } = useQuery({
    queryKey: ['patients'],
    queryFn: patientsAPI.getAll
  });
  
  const [selected, setSelected] = useState<any>(null);
  const [form, setForm] = useState({
    patient_id: '',
    doctor_id: '',
    appointment_date: '',
    appointment_time: '',
    reason: '',
    status: 'scheduled',
    notes: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const createMutation = useMutation({
    mutationFn: appointmentsAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast({
        title: "Success",
        description: "Appointment created successfully"
      });
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create appointment",
        variant: "destructive"
      });
    }
  });
  
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) => appointmentsAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast({
        title: "Success",
        description: "Appointment updated successfully"
      });
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update appointment",
        variant: "destructive"
      });
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => appointmentsAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast({
        title: "Success",
        description: "Appointment deleted successfully"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete appointment",
        variant: "destructive"
      });
    }
  });

  const resetForm = () => {
    setForm({
      patient_id: '',
      doctor_id: '',
      appointment_date: '',
      appointment_time: '',
      reason: '',
      status: 'scheduled',
      notes: ''
    });
    setIsEditing(false);
    setSelected(null);
  };

  const handleEdit = (appointment: any) => {
    setSelected(appointment);
    setForm({
      patient_id: appointment.patient_id?.toString() || '',
      doctor_id: appointment.doctor_id?.toString() || '',
      appointment_date: appointment.appointment_date || '',
      appointment_time: appointment.appointment_time || '',
      reason: appointment.reason || '',
      status: appointment.status || 'scheduled',
      notes: appointment.notes || ''
    });
    setIsEditing(true);
  };

  const handleDelete = (id: any) => {
    if (confirm('Are you sure you want to delete this appointment?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const appointmentData = {
      patient_id: parseInt(form.patient_id),
      doctor_id: parseInt(form.doctor_id),
      appointment_date: form.appointment_date,
      appointment_time: form.appointment_time,
      reason: form.reason,
      status: form.status as 'scheduled' | 'completed' | 'cancelled' | 'no-show',
      notes: form.notes
    };
    
    if (isEditing && selected) {
      updateMutation.mutate({ id: selected.id, data: appointmentData });
    } else {
      createMutation.mutate(appointmentData);
    }
  };

  const getPatientName = (patientId: number) => {
    const patient = patients.find((p: any) => p.id === patientId);
    return patient ? patient.full_name : `Patient ID: ${patientId}`;
  };

  const getDoctorName = (doctorId: number) => {
    const doctor = doctors.find((d: any) => d.id === doctorId);
    return doctor ? doctor.full_name : `Doctor ID: ${doctorId}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Appointments Management</h1>
        <p className="text-gray-600">Create, update, and manage appointments.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              {isEditing ? 'Edit Appointment' : 'Create New Appointment'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient
                </label>
                <Select value={form.patient_id} onValueChange={(value) => setForm({...form, patient_id: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient: any) => (
                      <SelectItem key={patient.id} value={patient.id.toString()}>
                        {patient.full_name} - {patient.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor
                </label>
                <Select value={form.doctor_id} onValueChange={(value) => setForm({...form, doctor_id: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor: any) => (
                      <SelectItem key={doctor.id} value={doctor.id.toString()}>
                        {doctor.full_name} - {doctor.specialization}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <Input
                    type="date"
                    value={form.appointment_date}
                    onChange={(e) => setForm({...form, appointment_date: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <Input
                    type="time"
                    value={form.appointment_time}
                    onChange={(e) => setForm({...form, appointment_time: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason
                </label>
                <Input
                  value={form.reason}
                  onChange={(e) => setForm({...form, reason: e.target.value})}
                  placeholder="Reason for appointment"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <Select value={form.status} onValueChange={(value) => setForm({...form, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="no-show">No Show</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <Textarea
                  value={form.notes}
                  onChange={(e) => setForm({...form, notes: e.target.value})}
                  placeholder="Additional notes..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-purple-400 hover:bg-purple-500">
                  {isEditing ? 'Update' : 'Create'} Appointment
                </Button>
                {isEditing && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              All Appointments ({appointments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4">Loading appointments...</div>
            ) : appointments.length === 0 ? (
              <div className="text-center py-4 text-gray-500">No appointments found</div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {appointments.map((appointment: any) => (
                  <div key={appointment.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            <strong>Patient:</strong> {getPatientName(appointment.patient_id)}
                          </div>
                          <div className="flex items-center text-sm">
                            <Stethoscope className="h-4 w-4 mr-2 text-gray-400" />
                            <strong>Doctor:</strong> {getDoctorName(appointment.doctor_id)}
                          </div>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            {appointment.appointment_date}
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                            {appointment.appointment_time}
                          </div>
                          {appointment.reason && (
                            <div className="text-sm text-gray-600">
                              <strong>Reason:</strong> {appointment.reason}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(appointment)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(appointment.id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAppointments;
