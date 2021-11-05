import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { ChatBubble, ChatRounded, LinearScaleSharp, PeopleAlt } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import StatisticItem from 'features/dashboard/components/StatisticItem';
import { Student } from 'models';
import { useEffect } from 'react';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import { dashboardActions, DashboardStatistics, RankingByCity, selectHighestStudentList, selectLoading, selectLowestStudentList, selectRankingByCityList, selectStatistics } from './dashboardSlice';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1)
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}))

export default function Dashboard () {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const loading: boolean = useAppSelector(selectLoading);
  const statistics: DashboardStatistics = useAppSelector(selectStatistics);
  const highestStudentList: Student[] = useAppSelector(selectHighestStudentList);
  const lowestStudentList: Student[] = useAppSelector(selectLowestStudentList);
  const rankingByCityList: RankingByCity[] = useAppSelector(selectRankingByCityList);

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch])

  return (
    <Box className={classes.root}>
      {/* loading */}
      { loading && <LinearProgress className={classes.loading} /> }
      {/* { Statistic section } */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem 
            icon={ <PeopleAlt fontSize='large' color="primary" /> } 
            label='male' 
            value={statistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem 
            icon={ <ChatRounded fontSize='large' color="primary" /> } 
            label='female' 
            value={statistics.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem 
            icon={ <ChatBubble fontSize='large' color="primary" /> } 
            label='mark >= 8' 
            value={statistics.highMarkCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem 
            icon={ <LinearScaleSharp fontSize='large' color="primary" /> } 
            label='mark <= 5' 
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>
      {/* All students ranking */}
      <Box mt={5}>
        <Typography variant="h4" >All students</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with highest mark" >
                <StudentRankingList studentList={highestStudentList} />
              </Widget>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with lowest mark" >
              <StudentRankingList studentList={lowestStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Rankings by city */}
      <Box mt={5}>
        <Typography variant="h4" >Rankings by city</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map(ranking => (
              <Grid item xs={12} md={6} lg={3} key={ranking.cityId}>
                <Widget title={ranking.cityName} >
                  <StudentRankingList studentList={ranking.rankingList} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
