import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StudentTableList from '../components/StudentTable';
import { selectStudentList, selectStudentPagination, studentActions } from '../studentSlice';
import { Pagination } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {},
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    justifyItems: 'center',
    marginBottom: theme.spacing(4)
  },
}))

export default function ListPage () {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);

  useEffect( () => {
    dispatch(studentActions.fetchStudentList({ _page: 1, _limit: 15 }))
  }, [dispatch])

  const handlePageChange = (e: any, page: number) => {

  }

  return (
    <Box className={classes.root}>
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Button variant="contained" color="primary">Add new student</Button>
      </Box>
      {/* Student table */}
      <StudentTableList studentList={studentList} />
      {/* Pagination */}
      <Pagination 
        color="primary"
        count={Math.ceil(pagination._totalRows / pagination._limit)} 
        page={pagination?._page} 
        onChange={handlePageChange}
      />
    </Box>
  );
}
