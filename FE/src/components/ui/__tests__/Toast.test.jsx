import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ToastProvider, useToast } from '../Toast';

const TestComponent = () => {
  const { addToast } = useToast();
  return (
    <button onClick={() => addToast('Success message test', 'success', 1000)}>
      Trigger Toast
    </button>
  );
};

describe('Toast Component System', () => {
  it('renders children and displays toast when triggered', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    // Initial state: no toast visible
    expect(screen.queryByText('Success message test')).not.toBeInTheDocument();

    // Trigger toast
    const button = screen.getByText('Trigger Toast');
    fireEvent.click(button);

    // Toast should be visible
    expect(await screen.findByText('Success message test')).toBeInTheDocument();
  });

  it('automatically removes toast after duration', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Trigger Toast');
    fireEvent.click(button);

    expect(screen.getByText('Success message test')).toBeInTheDocument();

    // Wait for it to be removed (duration is 1000ms)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    expect(screen.queryByText('Success message test')).not.toBeInTheDocument();
  });
});
