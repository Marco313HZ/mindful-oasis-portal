
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { doctorsAPI, patientsAPI } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, User, Phone, Mail, Calendar } from 'lucide-react';

const AdminDoctorsPatients = () => {
  const { data: doctors = [], isLoading: loadingDoctors, error: doctorsError } = useQuery({
    queryKey: ['doctors'],
    queryFn: doctorsAPI.getAll,
  });
  
  const { data: patients = [], isLoading: loadingPatients, error: patientsError } = useQuery({
    queryKey: ['patients'],
    queryFn: patientsAPI.getAll,
  });

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Doctors & Patients</h1>
        <p className="text-gray-600">Manage all doctors and patients in the system.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Doctors ({doctors.length})
            </CardTitle>
            <Button size="sm" className="bg-purple-400 hover:bg-purple-500">
              <Plus className="h-4 w-4 mr-1" />
              Add Doctor
            </Button>
          </CardHeader>
          <CardContent>
            {loadingDoctors ? (
              <div className="text-center py-4">Loading doctors...</div>
            ) : doctorsError ? (
              <div className="text-center py-4 text-red-600">
                Error loading doctors: {doctorsError.message}
              </div>
            ) : doctors.length === 0 ? (
              <div className="text-center py-4 text-gray-500">No doctors found</div>
            ) : (
              <div className="space-y-3">
                {doctors.map((doctor: any) => (
                  <div key={doctor.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{doctor.full_name}</h3>
                        <p className="text-sm text-purple-600">{doctor.specialization}</p>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-4 w-4 mr-2" />
                            {doctor.email}
                          </div>
                          {doctor.phone && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="h-4 w-4 mr-2" />
                              {doctor.phone}
                            </div>
                          )}
                          {doctor.license_number && (
                            <div className="text-xs text-gray-500">
                              License: {doctor.license_number}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Patients ({patients.length})
            </CardTitle>
            <Button size="sm" className="bg-purple-400 hover:bg-purple-500">
              <Plus className="h-4 w-4 mr-1" />
              Add Patient
            </Button>
          </CardHeader>
          <CardContent>
            {loadingPatients ? (
              <div className="text-center py-4">Loading patients...</div>
            ) : patientsError ? (
              <div className="text-center py-4 text-red-600">
                Error loading patients: {patientsError.message}
              </div>
            ) : patients.length === 0 ? (
              <div className="text-center py-4 text-gray-500">No patients found</div>
            ) : (
              <div className="space-y-3">
                {patients.map((patient: any) => (
                  <div key={patient.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{patient.full_name}</h3>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-4 w-4 mr-2" />
                            {patient.email}
                          </div>
                          {patient.phone && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="h-4 w-4 mr-2" />
                              {patient.phone}
                            </div>
                          )}
                          {patient.date_of_birth && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="h-4 w-4 mr-2" />
                              {new Date(patient.date_of_birth).toLocaleDateString()}
                            </div>
                          )}
                          {patient.gender && (
                            <div className="text-xs text-gray-500">
                              Gender: {patient.gender}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
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

export default AdminDoctorsPatients;
