import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../Card';

describe('Card Component', () => {
  it('renders standard card structure correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title Text</CardTitle>
          <CardDescription>Card Description Text</CardDescription>
        </CardHeader>
        <CardContent>Card Content Text</CardContent>
        <CardFooter>Card Footer Text</CardFooter>
      </Card>
    );

    expect(screen.getByText('Card Title Text')).toBeInTheDocument();
    expect(screen.getByText('Card Description Text')).toBeInTheDocument();
    expect(screen.getByText('Card Content Text')).toBeInTheDocument();
    expect(screen.getByText('Card Footer Text')).toBeInTheDocument();
  });

  it('triggers click event when interactive card is clicked', () => {
    const handleClick = vi.fn();
    render(
      <Card interactive onClick={handleClick}>
        <CardContent>Interactive Card Content</CardContent>
      </Card>
    );

    const card = screen.getByText('Interactive Card Content');
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
