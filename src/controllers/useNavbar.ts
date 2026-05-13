import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setLocation, setSearchQuery } from '../store/appSlice';
import { toggleSidebar } from '../store/uiSlice';

export const useNavbar = () => {
  const dispatch = useDispatch();
  const { location, searchQuery } = useSelector((state: RootState) => state.app);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLocationChange = (loc: string) => {
    dispatch(setLocation(loc));
  };

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleToggleMenu = () => {
    dispatch(toggleSidebar());
  };

  return {
    location,
    searchQuery,
    isScrolled,
    handleLocationChange,
    handleSearch,
    handleToggleMenu,
  };
};
