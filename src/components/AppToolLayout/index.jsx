import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { setCurrentToolId } from '../../features/application/applicationSlice';
import SideBar from '../SideBar';

export default function AppToolLayout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const tools = useSelector((state) => state.application.tools);
  const ref = useRef();

  useEffect(() => {
    // Set Current Tool ID if actual path is found in toolList
    const currentTool = tools.find((tool) => tool.link === location.pathname);
    if (currentTool) {
      dispatch(setCurrentToolId(currentTool.id));
    }

    // Scroll to Top when change location
    ref.current.scrollTo({ top: 0 });
  }, [location, tools]);

  return (
    <Flex minH="calc(100dvh - 70px)" maxH="calc(100dvh - 70px)">
      <Flex display={{ base: 'none', md: 'flex' }}>
        <SideBar />
      </Flex>
      <Box ref={ref} flexGrow="1" overflowY="auto">
        <Outlet />
      </Box>
    </Flex>
  );
}
