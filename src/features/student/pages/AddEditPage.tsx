import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import React, { useState, useEffect } from 'react';
import { Link, useParams} from 'react-router-dom'
import StudentForm from '../components/StudentForm';

export default function AddEditPage () {
  const { studentId } = useParams<{studentId: string}>();
  const isEdit = Boolean(studentId)

  const [student, setStudent] = useState<Student>();

  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    city: '',
    ...student,
  } as Student

  useEffect(() => {
    if(!studentId) return;

    // IIFE
    (async () => {
      try {
        const data = await studentApi.getById(studentId);
        setStudent(data);
      } catch (error) {
        console.error(`Failed to fetch student detail`, error)
      }
    })();
  })

  const handleStudentFormSubmit = (formValues: Student) => {

  }

  return (
    <Box>
      <Link to='/admin/students'>
        <Typography variant="caption" style={{ display: "flex", alignItems: "center" }}>
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>
      <Typography variant="h4">
        {
          isEdit ? 'Update student' : 'Add new student'
        }
      </Typography>

    {(!isEdit || Boolean(student)) && (
      <Box>
        <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
      </Box>
    )}
    </Box>
  );
}
