import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { getDoctors, getPatients } from '../services-api/appointmentService';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDoctorsPatients = () => {
  const { data: doctors = [], isLoading: loadingDoctors } = useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
  });
  const { data: patients = [], isLoading: loadingPatients } = useQuery({
    queryKey: ['patients'],
    queryFn: getPatients,
  });

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Doctors & Patients</h1>
        <p className="text-gray-600">View all doctors and patients in the system.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingDoctors ? (
              <div>Loading...</div>
            ) : (
              <ul className="divide-y">
                {doctors.map((doc: any) => (
                  <li key={doc.id} className="py-2">
                    <div className="font-semibold">{doc.name}</div>
                    <div className="text-xs text-gray-500">{doc.email}</div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Patients</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingPatients ? (
              <div>Loading...</div>
            ) : (
              <ul className="divide-y">
                {patients.map((pat: any) => (
                  <li key={pat.id} className="py-2">
                    <div className="font-semibold">{pat.name}</div>
                    <div className="text-xs text-gray-500">{pat.email}</div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDoctorsPatients;
