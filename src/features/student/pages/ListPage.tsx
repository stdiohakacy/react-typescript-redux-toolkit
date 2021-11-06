import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StudentTableList from '../components/StudentTable';
import { selectStudentFilter, selectStudentList, selectStudentPagination, studentActions } from '../studentSlice';
import { Pagination } from '@material-ui/lab'
import { selectLoading } from 'features/dashboard/dashboardSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1)
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    justifyItems: 'center',
    marginBottom: theme.spacing(4)
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}))

export default function ListPage () {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter)
  const loading = useAppSelector(selectLoading)

  useEffect( () => {
    dispatch(studentActions.fetchStudentList(filter))
  }, [dispatch, filter])

  const handlePageChange = (e: any, page: number) => {
    dispatch(studentActions.setFilter({
      ...filter,
      _page: page
    }))
  }

  return (
    <Box className={classes.root}>
      {/* loading */}
      { loading && <LinearProgress className={classes.loading} /> }
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Button variant="contained" color="primary">Add new student</Button>
      </Box>
      {/* Student table */}
      <StudentTableList studentList={studentList} />
      {/* Pagination */}
      <Box my={2} display="flex" justifyContent="center" >
        <Pagination 
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)} 
          page={pagination._page} 
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
