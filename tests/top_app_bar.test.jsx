import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import TopAppBar from '../src/components/TopAppBar';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getAuthState } from '../src/helpers/FirebaseInterface';

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock('../src/helpers/FirebaseInterface', () => ({
  initFirebase: vi.fn(),
  getAuthState: vi.fn(() => 'mock-auth'),
}));

test('profile menu signs the current user out', async () => {
  const user = { displayName: 'Dive User', email: 'dive@example.com', photoURL: null };
  onAuthStateChanged.mockImplementation((auth, callback) => {
    callback(user);
    return vi.fn();
  });
  signOut.mockResolvedValue();

  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <TopAppBar />
    </MemoryRouter>
  );

  fireEvent.click(await screen.findByRole('button', { name: 'Signed in as Dive User' }));
  fireEvent.click(screen.getByRole('menuitem', { name: 'Sign out' }));

  await waitFor(() => expect(signOut).toHaveBeenCalledWith(getAuthState()));
});
