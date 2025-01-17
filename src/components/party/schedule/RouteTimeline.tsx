import { Box, Flex, Heading, Img, List, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';

import { fetchScheduleList } from '@/api/schedules';
import Loading from '@/components/base/Loading';
import { ScheduleType, TimeLineProps } from '@/types/schedule';

import RouteReleaseChange from './RouteReleaseChange';
import RouteTimelineItem from './RouteTimelineItem';
import RouteTitle from './RouteTitle';

const RouteTimeline = ({ onClickHandler, routerButton, isPublic }: TimeLineProps) => {
  const { partyId } = useParams();
  const { pathname } = useLocation();

  const {
    data: scheduleList,
    isLoading,
    isFetching,
    isError,
  } = useQuery<ScheduleType>(['scheduleList', partyId], () =>
    fetchScheduleList(Number(partyId), isPublic)
  );
  if (isLoading || isFetching)
    return (
      <>
        <Loading />
      </>
    );
  if (isError)
    return (
      <Flex direction='column' align='center'>
        <Heading size='md' textAlign='center' pt='36px'>
          등록된 일정이 없습니다.
        </Heading>
        <Text pt='16px'>계획을 일정으로 등록해보세요!</Text>
        <Img src='/landing-1.svg' w='13rem' />
      </Flex>
    );

  return (
    <Box pos='relative'>
      {isPublic && <RouteTitle scheduleList={scheduleList} />}

      {pathname.includes('party') && (
        <RouteReleaseChange scheduleList={scheduleList} routeId={scheduleList.id} />
      )}
      <StyleList>
        {scheduleList.locations.map((route) => (
          <RouteTimelineItem
            key={route.id}
            {...route}
            routeId={scheduleList.id}
            onClickHandler={onClickHandler}
            routerButton={routerButton}
          />
        ))}
      </StyleList>
    </Box>
  );
};

export default RouteTimeline;

const StyleList = styled(List)`
  position: relative;

  &::before {
    content: '';
    height: 100%;
    border: 1px solid #e0e0e0;
    position: absolute;
    left: 13.5%;
  }
`;
