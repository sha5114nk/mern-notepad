import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../lib/axios.js'; 

import Navbar from '../components/Navbar.jsx'
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import NoteCard from '../components/NoteCard.jsx';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true );

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes');
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error('Error fetching notes:', error);
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Failed to fetch notes. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();  
  }, []);
  return (
    <div className='min-h-screen'>
      <Navbar />
      {isRateLimited ? <RateLimitedUI /> :
      //Notes list
      (<div className="container max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}
        {!!notes.length && !isRateLimited && (
          <div className="grid grid-cols -1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>)}
    </div>
  );
}

export default HomePage 