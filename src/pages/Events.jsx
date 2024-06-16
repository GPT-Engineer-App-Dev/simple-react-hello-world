import { useState } from 'react';
import { Container, Heading, Button, VStack, HStack, Input, Select, FormControl, FormLabel, useToast, Text } from '@chakra-ui/react';
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent, useVenues } from '../integrations/supabase/index.js';

const Events = () => {
  const { data: events, isLoading: eventsLoading, error: eventsError } = useEvents();
  const { data: venues, isLoading: venuesLoading, error: venuesError } = useVenues();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const toast = useToast();

  const [newEvent, setNewEvent] = useState({ name: '', date: '', venue: '' });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = async () => {
    try {
      await addEvent.mutateAsync(newEvent);
      setNewEvent({ name: '', date: '', venue: '' });
      toast({ title: 'Event added successfully', status: 'success' });
    } catch (error) {
      toast({ title: 'Error adding event', status: 'error' });
    }
  };

  const handleUpdateEvent = async () => {
    try {
      await updateEvent.mutateAsync(editingEvent);
      setEditingEvent(null);
      toast({ title: 'Event updated successfully', status: 'success' });
    } catch (error) {
      toast({ title: 'Error updating event', status: 'error' });
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent.mutateAsync(id);
      toast({ title: 'Event deleted successfully', status: 'success' });
    } catch (error) {
      toast({ title: 'Error deleting event', status: 'error' });
    }
  };

  if (eventsLoading || venuesLoading) return <div>Loading...</div>;
  if (eventsError || venuesError) return <div>Error loading data</div>;

  return (
    <Container maxW="container.md" py={8}>
      <Heading mb={4}>Events</Heading>
      <VStack spacing={4} align="stretch">
        {events.map((event) => (
          <HStack key={event.id} spacing={4}>
            <VStack align="start">
              <Heading size="md">{event.name}</Heading>
              <Text>{event.date}</Text>
              <Text>{venues.find((venue) => venue.id === event.venue)?.name}</Text>
            </VStack>
            <Button onClick={() => setEditingEvent(event)}>Edit</Button>
            <Button colorScheme="red" onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
          </HStack>
        ))}
      </VStack>
      <VStack spacing={4} mt={8} align="stretch">
        <Heading size="md">{editingEvent ? 'Edit Event' : 'Add Event'}</Heading>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input name="name" value={editingEvent ? editingEvent.name : newEvent.name} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input type="date" name="date" value={editingEvent ? editingEvent.date : newEvent.date} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Venue</FormLabel>
          <Select name="venue" value={editingEvent ? editingEvent.venue : newEvent.venue} onChange={handleInputChange}>
            <option value="">Select Venue</option>
            {venues.map((venue) => (
              <option key={venue.id} value={venue.id}>{venue.name}</option>
            ))}
          </Select>
        </FormControl>
        <Button onClick={editingEvent ? handleUpdateEvent : handleAddEvent}>
          {editingEvent ? 'Update Event' : 'Add Event'}
        </Button>
        {editingEvent && <Button onClick={() => setEditingEvent(null)}>Cancel</Button>}
      </VStack>
    </Container>
  );
};

export default Events;