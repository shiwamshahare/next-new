"use client";

import { useState, useEffect } from "react";
import { BrutalButton } from "@/components/ui/brutal-button";
import { BrutalCard } from "@/components/ui/brutal-card";
import { BrutalInput } from "@/components/ui/brutal-input";
import { BrutalBadge } from "@/components/ui/brutal-badge";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Edit3,
  X,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { getProfileServerAction, updateProfileServerAction } from "@/app/actions/profile";

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
  countryCode: string;
  phoneNumber: string;
  dob?: string;
  account?: {
    _id: string;
    username: string;
    email: string;
    role: string;
    avatar?: { url: string };
    isEmailVerified?: boolean;
  };
  followersCount?: number;
  followingCount?: number;
}

interface ProfileViewProps {
  initialData?: UserProfile;
}

export function ProfileView({ initialData }: ProfileViewProps) {
  const [profile, setProfile] = useState<UserProfile | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for popup modal
  const [firstName, setFirstName] = useState(initialData?.firstName || "");
  const [lastName, setLastName] = useState(initialData?.lastName || "");
  const [bio, setBio] = useState(initialData?.bio || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [countryCode, setCountryCode] = useState(initialData?.countryCode || "+1");
  const [phoneNumber, setPhoneNumber] = useState(initialData?.phoneNumber || "");
  const [saving, setSaving] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalSuccess, setModalSuccess] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("admin_token") || undefined;

      // Server Action: Executes GET profile on server
      const result = await getProfileServerAction(token);

      if (result.success && result.data) {
        const p: UserProfile = result.data;
        setProfile(p);
        // Pre-fill form fields
        setFirstName(p.firstName || "");
        setLastName(p.lastName || "");
        setBio(p.bio || "");
        setLocation(p.location || "");
        setCountryCode(p.countryCode || "+1");
        setPhoneNumber(p.phoneNumber || "");
      } else {
        throw new Error(result.error || "Failed to fetch profile on server.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred fetching profile on server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialData) {
      fetchProfile();
    }
  }, []);

  const handleOpenModal = () => {
    if (profile) {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
      setBio(profile.bio || "");
      setLocation(profile.location || "");
      setCountryCode(profile.countryCode || "+1");
      setPhoneNumber(profile.phoneNumber || "");
    }
    setModalError(null);
    setModalSuccess(null);
    setIsModalOpen(true);
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = localStorage.getItem("admin_token") || undefined;

    try {
      setSaving(true);
      setModalError(null);
      setModalSuccess(null);

      // Server Action: Executes PATCH update profile on server
      const result = await updateProfileServerAction(formData, token);

      if (result.success && result.data) {
        setModalSuccess(result.message || "Profile updated successfully on server!");
        setProfile((prev) => (prev ? { ...prev, ...result.data } : result.data));
        setTimeout(() => {
          setIsModalOpen(false);
          setModalSuccess(null);
        }, 1200);
      } else {
        throw new Error(result.error || "Failed to update profile on server");
      }
    } catch (err) {
      setModalError(err instanceof Error ? err.message : "Failed to save profile changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="font-mono">
      {/* Title Bar */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold uppercase mb-1">User Profile</h2>
          <p className="text-sm text-neutral-600 font-mono">Manage your account information and preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <BrutalButton onClick={fetchProfile}>
            <RefreshCw size={14} className={`inline mr-1 ${loading ? "animate-spin" : ""}`} /> Refresh
          </BrutalButton>
          {profile && (
            <BrutalButton variant="accent" onClick={handleOpenModal}>
              <Edit3 size={14} className="inline mr-1" /> Edit Profile
            </BrutalButton>
          )}
        </div>
      </div>

      {loading ? (
        <BrutalCard className="p-8 text-center animate-pulse">
          <p className="font-bold text-neutral-500 uppercase">Fetching user profile via Server Action...</p>
        </BrutalCard>
      ) : error ? (
        <BrutalCard className="p-6 text-center">
          <div className="text-red-600 font-bold mb-4 flex items-center justify-center gap-2">
            <AlertTriangle size={20} />
            <span>{error}</span>
          </div>
          <p className="text-xs text-neutral-600 mb-4">Please log in to view and update your profile details.</p>
          <div className="flex justify-center gap-3">
            <a href="/login" className="inline-block">
              <BrutalButton variant="accent">Go to Login</BrutalButton>
            </a>
            <BrutalButton onClick={fetchProfile}>Retry</BrutalButton>
          </div>
        </BrutalCard>
      ) : profile ? (
        <div className="space-y-6">
          {/* Main User Card */}
          <BrutalCard>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b-2 border-black pb-6">
                <div className="flex items-center gap-4">
                  {profile.account?.avatar?.url ? (
                    <img
                      src={profile.account.avatar.url}
                      alt={profile.account.username}
                      className="w-20 h-20 border-2 border-black object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 border-2 border-black bg-red-600 text-white font-bold text-2xl flex items-center justify-center shrink-0">
                      {profile.firstName?.[0] || profile.account?.username?.[0] || "A"}
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold uppercase text-black">
                      {profile.firstName || profile.lastName
                        ? `${profile.firstName} ${profile.lastName}`.trim()
                        : profile.account?.username || "Admin User"}
                    </h3>
                    <div className="text-sm text-neutral-500 font-bold">@{profile.account?.username}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <BrutalBadge tone="accent">{profile.account?.role || "ADMIN"}</BrutalBadge>
                      {profile.account?.isEmailVerified && (
                        <span className="inline-flex items-center text-xs font-bold text-green-700 gap-1 bg-green-50 border border-green-700 px-2 py-0.5">
                          <ShieldCheck size={12} /> Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <BrutalButton variant="accent" onClick={handleOpenModal}>
                  <Edit3 size={14} className="inline mr-1" /> Edit Profile
                </BrutalButton>
              </div>

              {/* Bio & Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 pt-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-bold uppercase text-neutral-500 tracking-wider mb-1">Biography</div>
                    <p className="text-sm font-bold text-black border-l-2 border-red-600 pl-3 py-1">
                      {profile.bio || "No biography provided yet. Click 'Edit Profile' to add a bio."}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold">
                    <Mail size={16} className="text-red-600 shrink-0" />
                    <span className="text-neutral-500">Email:</span>
                    <span className="text-black">{profile.account?.email || "N/A"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold">
                    <MapPin size={16} className="text-red-600 shrink-0" />
                    <span className="text-neutral-500">Location:</span>
                    <span className="text-black">{profile.location || "Not specified"}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <Phone size={16} className="text-red-600 shrink-0" />
                    <span className="text-neutral-500">Phone:</span>
                    <span className="text-black">
                      {profile.phoneNumber
                        ? `${profile.countryCode || ""} ${profile.phoneNumber}`
                        : "Not specified"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="border-2 border-black p-3 bg-neutral-50">
                      <div className="text-2xl font-bold text-black">{profile.followersCount || 0}</div>
                      <div className="text-xs font-bold uppercase text-neutral-600">Followers</div>
                    </div>
                    <div className="border-2 border-black p-3 bg-neutral-50">
                      <div className="text-2xl font-bold text-black">{profile.followingCount || 0}</div>
                      <div className="text-xs font-bold uppercase text-neutral-600">Following</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BrutalCard>
        </div>
      ) : null}

      {/* UPDATE PROFILE POPUP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-5">
              <h3 className="text-lg font-bold uppercase flex items-center gap-2">
                <Edit3 size={18} className="text-red-600" /> Update Profile
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="border-2 border-black p-1 hover:bg-black hover:text-white cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Alerts */}
            {modalError && (
              <div className="mb-4 p-3 border-2 border-black bg-red-100 text-red-700 text-xs font-bold uppercase flex items-start gap-2">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <div>{modalError}</div>
              </div>
            )}

            {modalSuccess && (
              <div className="mb-4 p-3 border-2 border-black bg-green-100 text-green-800 text-xs font-bold uppercase flex items-start gap-2">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                <div>{modalSuccess}</div>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <BrutalInput
                  label="First Name"
                  name="firstName"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <BrutalInput
                  label="Last Name"
                  name="lastName"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide mb-1">Bio / About</label>
                <textarea
                  name="bio"
                  rows={3}
                  className="w-full border-2 border-black bg-white px-3 py-2 font-mono text-sm focus:outline-none focus:border-red-600 resize-none"
                  placeholder="Tell us about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <BrutalInput
                label="Location"
                name="location"
                placeholder="e.g. New York, USA"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <div className="grid grid-cols-3 gap-3">
                <BrutalInput
                  label="Country Code"
                  name="countryCode"
                  placeholder="+1"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                />
                <div className="col-span-2">
                  <BrutalInput
                    label="Phone Number"
                    name="phoneNumber"
                    placeholder="1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-black">
                <BrutalButton type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </BrutalButton>
                <BrutalButton type="submit" variant="accent" disabled={saving}>
                  {saving ? "Saving Changes on Server..." : "Save Profile →"}
                </BrutalButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
