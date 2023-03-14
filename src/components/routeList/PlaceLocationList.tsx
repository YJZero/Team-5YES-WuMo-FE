import { Flex, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { MdOutlineLinearScale } from 'react-icons/md';

import { CustomScrollX } from '@/styles/globalStyle';
import { RoutePlaceListProps } from '@/types/routeList';

const PlaceLocationList = ({ locations }: RoutePlaceListProps) => {
  return (
    <CustomScrollX mb='6' overflowX='scroll' gap='0.25rem' pb='2'>
      {locations.map(({ id, name, image, address }, index) => (
        <PlaceItem key={id}>
          <Flex flexDirection='column' alignItems='center' gap='1' justify='flex-start'>
            <Text fontSize='0.375rem'>{address.split(' ')[0]}</Text>
            <Image
              fallbackSrc='./logo.svg'
              src={image ? image : './logo.svg'}
              maxW='2.5rem'
              h='2.5rem'
              borderRadius='4'
            />
            <Text
              fontSize='xs'
              wordBreak='keep-all'
              textAlign='center'
              maxW='4rem'
              textOverflow='ellipsis'
              whiteSpace='nowrap'
              overflow='hidden'>
              {name}
            </Text>
          </Flex>
          {index === locations.length - 1 ? (
            ''
          ) : (
            <MdOutlineLinearScale style={{ margin: 0 }} />
          )}
        </PlaceItem>
      ))}
    </CustomScrollX>
  );
};

const PlaceItem = styled(Flex)`
  margin: 0 !important;
  align-items: center;
  gap: 0.25rem;
`;

export default PlaceLocationList;
