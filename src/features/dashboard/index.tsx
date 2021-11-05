import { Box, Grid } from '@material-ui/core';
import { ChatBubble, ChatRounded, LinearScaleSharp, PeopleAlt } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import StatisticItem from 'features/dashboard/components/StatisticItem';
import { Student } from 'models';
import { useEffect } from 'react';
import { dashboardActions, DashboardStatistics, RankingByCity, selectHighestStudentList, selectLoading, selectLowestStudentList, selectRankingByCityList, selectStatistics } from './dashboardSlice';

export default function Dashboard () {
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
    <Box>
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
    </Box>
  )
}
