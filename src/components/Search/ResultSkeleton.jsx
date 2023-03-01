/* eslint-disable react/no-array-index-key */
import { Skeleton, SkeletonCircle, SkeletonText, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function ResultSkeleton({ isLoaded }) {
  return (
    <>
      {Array(8)
        .fill(0)
        .map((skeleton, index) => (
          <VStack
            width="350px"
            p="1rem"
            margin="auto"
            boxShadow="xl"
            display={isLoaded && 'none'}
            key={index}
          >
            <SkeletonCircle isLoaded={isLoaded} size="10" fadeDuration={1} />
            <Skeleton height="200px" isLoaded={isLoaded} fadeDuration={1} />
            <SkeletonText
              isLoaded={isLoaded}
              mt="4"
              noOfLines={4}
              spacing="4"
              skeletonHeight="4"
              fadeDuration={1}
            />
          </VStack>
        ))}
    </>
  );
}

ResultSkeleton.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
};

export default ResultSkeleton;
