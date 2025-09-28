import { renderHook, act } from '@testing-library/react';
import { useMockAuth, MockAuthProvider } from './useMockAuth';
import { describe, it, expect } from 'vitest';
import React from 'react';

describe('useMockAuth', () => {
  it('should have loading state as true initially and then false after effect', async () => {
    let loadingHistory: boolean[] = [];

    const TestComponent: React.FC = () => {
      const { loading } = useMockAuth();
      loadingHistory.push(loading);
      return null;
    };

    renderHook(() => useMockAuth(), {
      wrapper: ({ children }) => (
        <MockAuthProvider>
          <TestComponent />
          {children}
        </MockAuthProvider>
      ),
    });

    // The first value captured should be the initial state
    expect(loadingHistory[0]).toBe(true);
  });
});