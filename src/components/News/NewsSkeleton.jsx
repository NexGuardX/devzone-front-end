import { Skeleton, SkeletonCircle, SkeletonText, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

/**
 * React Component that Displays Fake News Skeleton while loading
 * @returns {JSX.elements} React Component
 */
export default function NewsSkeleton({ isLoaded }) {
  return (
    <>
      {Array(6)
        .fill(0)
        .map((skeleton, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <VStack p="1rem" boxShadow="xl" display={isLoaded && 'none'} key={index}>
            <Skeleton height="200px" isLoaded={isLoaded} fadeDuration={1} />
            <SkeletonText
              isLoaded={isLoaded}
              mt="4"
              noOfLines={4}
              spacing="4"
              skeletonHeight="4"
              fadeDuration={1}
            />
            <SkeletonCircle isLoaded={isLoaded} size="10" fadeDuration={1} />
          </VStack>
        ))}
    </>
  );
}

NewsSkeleton.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
};
