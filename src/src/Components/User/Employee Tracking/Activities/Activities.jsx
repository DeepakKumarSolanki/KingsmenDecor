import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";

import Event from '../../../../assets/admin/event.gif'

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const Activity_Data_Api = `http://localhost:8080/getEvents`;

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await fetch(Activity_Data_Api);
      const result = await response.json();

      if (response.ok) {
        console.log('Fetched activities:', result);
        setActivities(result.data);
      } else {
        console.error('Failed to fetch activities:', result.message);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="p-4 bg-transparent min-h-screen">
      {/* Header Section */}
      <div className="rounded-md flex justify-between p-4 mb-6 border-solid flex-wrap gap-4">
        <h6 className="text-2xl font-semibold text-[#b17f27]">
          Activities
          <div className="text-[14px]">
            <p>Dashboard / Activities</p>
          </div>
        </h6>
      </div>

      {/* Activities Section */}
      <Box sx={{ bgcolor: 'transparent', minHeight: '100vh', p: 3 }}>
        {loading ? (
          <Typography variant="h6" textAlign="center">Loading activities...</Typography>
        ) : activities.length === 0 ? (
          <Typography variant="h6" textAlign="center">No activities found.</Typography>
        ) : (
          <List
            sx={{
              bgcolor: 'white',
              borderRadius: 2,
              boxShadow: 2,
              maxWidth: 1800,
              margin: '0 auto',
            }}
          >
            {activities.map((activity, index) => (
              <ListItem
                key={index}
                alignItems="flex-start"
                sx={{
                  borderBottom: '1px solid #eee',
                  p: 2,
                  '&:hover': { backgroundColor: '#b17f27', cursor: 'pointer' },
                  transition: 'background-color 0.3s ease',
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={activity.eventDescription} // Changed from eventName to eventDescription
                    src={Event}
                    sx={{ border: '2px solid #b17f27', boxShadow: 2 }}
                  />
                </ListItemAvatar>
                <ListItemText
  primary={
    <Typography variant="body1" fontWeight="bold">
      {activity.eventTitle} {/* Changed from eventName to eventDescription */}
      {' - '}
      <span style={{ fontWeight: 400 }}>
        {activity.eventDescription} {/* Added eventName here */}
      </span>
      
    </Typography>
  }
  secondary={
    <Typography variant="body2" color="text.secondary">
      {activity.eventDate}
    </Typography>
  }
/>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </div>
  );
};

export default Activities;
