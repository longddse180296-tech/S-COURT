import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Input from '../Input';
import { Mail } from 'lucide-react';

describe('Input Component', () => {
  it('renders input with label and placeholder correctly', () => {
    render(<Input label="Email Address" placeholder="Enter your email" />);
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    render(<Input label="Username" placeholder="Enter username" />);
    const input = screen.getByLabelText('Username');
    fireEvent.change(input, { target: { value: 'testuser' } });
    expect(input.value).toBe('testuser');
  });

  it('renders error message and applies border styling', () => {
    render(<Input label="Username" error="Username is required" />);
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText('Username is required')).toBeInTheDocument();
  });

  it('renders left icon if provided', () => {
    render(<Input label="Email" icon={<Mail data-testid="mail-icon" />} />);
    expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
  });

  it('toggles password visibility when the eye button is clicked', () => {
    render(<Input label="Password" type="password" placeholder="Enter password" />);
    const input = screen.getByLabelText('Password');
    
    // Initial type should be password
    expect(input.type).toBe('password');
    
    // Toggle button should exist
    const toggleBtn = screen.getByTestId('password-toggle');
    expect(toggleBtn).toBeInTheDocument();
    
    // Click toggle button
    fireEvent.click(toggleBtn);
    expect(input.type).toBe('text');
    
    // Click toggle button again
    fireEvent.click(toggleBtn);
    expect(input.type).toBe('password');
  });
});
