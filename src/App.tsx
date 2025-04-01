import React, { useState } from 'react';
import { Search, User, Clock, Calendar, MapPin, Building } from 'lucide-react';

interface UserData {
  id: string;
  bot: boolean;
  system: boolean;
  flags: number;
  username: string;
  globalName: string;
  discriminator: string;
  avatar: string;
  banner: string | null;
  bannerColor: string;
  accentColor: number;
  avatarDecorationData: {
    asset: string;
    skuId: string;
  };
  clan: null;
  verified: boolean;
  mfaEnabled: boolean;
  purchasedFlags: number;
  premiumUsageFlags: number;
  phone: null;
  nsfwAllowed: boolean;
  email: string;
  bio: string;
  pronouns: string;
  premiumType: number;
  createdTimestamp: number;
  defaultAvatarURL: string;
  hexAccentColor: string;
  tag: string;
  avatarURL: string;
  displayAvatarURL: string;
  bannerURL: string | null;
}

function App() {
  const [searchId, setSearchId] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call with mock data
    setTimeout(async() => {
      await fetch(`http://localhost:3000/user/${searchId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <User className="w-8 h-8" />
            ID Lookup System
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter ID number..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400" />
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-100 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Results Card */}
          {userData && (
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
              <div className="grid gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 rounded-full p-3">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">{userData.username}</h2>
                    <p className="text-gray-400">ID: {userData.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Join Date</p>
                      <p>{new Date(userData.createdTimestamp).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">BIO</p>
                      <p>{userData.bio || 'No bio'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p>{userData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Building className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Pronouns</p>
                      <p>{userData.pronouns}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;