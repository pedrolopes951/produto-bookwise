"use client";
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [stored, setStored] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) setStored(JSON.parse(item));
    } catch {}
  }, [key]);

  const setValue = (value: T | ((prev: T) => T)) => {
    setStored((prev) => {
      const next = value instanceof Function ? value(prev) : value;
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  };

  return [stored, setValue];
}
