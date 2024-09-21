import React from 'react';

const HomeIcon = ({ width, height, addClassNames }) => {
  return (
    <svg
      width={width}
      height={height}
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 24 24'
      stroke='currentColor'
      aria-hidden='true'
      className={`w-5 h-5 ${addClassNames}`}
    >
      <path d='M3 12L12 2m0 0l9 10M12 2v20' />
    </svg>
  );
};

const OderIcon = ({ width, height, addClassNames }) => {
  return (
    <svg
      width={width}
      height={height}
      fill='currentColor'
      viewBox='0 0 20 20'
      aria-hidden='true'
      className={`w-5 h-5 ${addClassNames}`}
    >
      <path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z' />
    </svg>
  );
};

const ProductIcon = ({ width, height, addClassNames }) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns='http://www.w3.org/2000/svg'
      className={`w-5 h-5 ${addClassNames}`}
      viewBox='0 0 20 20'
      fill='currentColor'
      aria-hidden='true'
    >
      <path d='M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z'></path>
      <path d='M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z'></path>
    </svg>
  );
};

const CustomerIcon = ({ width, height, addClassNames }) => {
  return (
    <svg
      width={width}
      height={height}
      fill='currentColor'
      viewBox='0 0 20 20'
      className={`w-5 h-5 ${addClassNames}`}
      aria-hidden='true'
    >
      <path
        fill-rule='evenodd'
        d='M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z'
        clip-rule='evenodd'
      ></path>
    </svg>
  );
};
const UserIcon = ({ width, height, addClassNames }) => {
  <svg
    width={width}
    height={height}
    xmlns='http://www.w3.org/2000/svg'
    className={`w-5 h-5 ${addClassNames}`}
    viewBox='0 0 20 20'
    fill='currentColor'
    aria-hidden='true'
  >
    <path fill-rule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clip-rule='evenodd'></path>
  </svg>;
};

const SetIcon = ({ width, height, addClassNames }) => {
  return (
    <svg
      width={width}
      height={height}
      fill='none'
      stroke-linecap='round'
      stroke-linejoin='round'
      stroke-width='2'
      viewBox='0 0 24 24'
      stroke='currentColor'
      class='w-5 h-5'
      aria-hidden='true'
    >
      <path d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'></path>
      <path d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'></path>
    </svg>
  );
};

const LogIcon = ({ width, height, addClassNames }) => {
  return (
    <svg
      width={width}
      height={height}
      fill='none'
      stroke-linecap='round'
      stroke-linejoin='round'
      stroke-width='2'
      viewBox='0 0 24 24'
      stroke='currentColor'
      class='w-5 h-5'
      aria-hidden='true'
    >
      <path d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'></path>
    </svg>
  );
};

const DarkIcon = ({ width, height, addClassNames }) => {
  return (
    <svg width={width} height={height} fill='currentColor' viewBox='0 0 20 20' class='w-5 h-5' aria-hidden='true'>
      <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'></path>
    </svg>
  );
};

const LightIcon = ({ width, height, addClassNames }) => {
  return (
    <svg width={width} height={height} fill='currentColor' viewBox='0 0 20 20' class={addClassNames} aria-hidden='true'>
      <path
        fill-rule='evenodd'
        d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
        clip-rule='evenodd'
      ></path>
    </svg>
  );
};

const NotiIcon = ({ width, height, addClassNames }) => {
  return (
    <svg width={width} height={height} fill='currentColor' viewBox='0 0 20 20' class={addClassNames} aria-hidden='true'>
      <path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z'></path>
    </svg>
  );
};

const CashIcon = ({ width, height, addClassNames }) => {
  return (
    <svg width={width} height={height} class={addClassNames} fill='currentColor' viewBox='0 0 20 20'>
      <path
        fill-rule='evenodd'
        d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z'
        clip-rule='evenodd'
      ></path>
    </svg>
  );
};

const ChatIcon = ({ width, height, addClassNames }) => {
  return (
    <svg width={width} height={height} class={addClassNames} fill='currentColor' viewBox='0 0 20 20'>
      <path
        fill-rule='evenodd'
        d='M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z'
        clip-rule='evenodd'
      ></path>
    </svg>
  );
};
const SearchIcons = ({ width, height, addClassNames }) => {
  return (
    <svg width={width} height={height} class={addClassNames} aria-hidden='true' fill='currentColor' viewBox='0 0 20 20'>
      <path
        fill-rule='evenodd'
        d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
        clip-rule='evenodd'
      ></path>
    </svg>
  );
};

const icons = {
  HomeIcon,
  OderIcon,
  ProductIcon,
  CustomerIcon,
  ChatIcon,
  CashIcon,
  NotiIcon,
  UserIcon,
  LightIcon,
  DarkIcon,
  SetIcon,
  LogIcon,
  SearchIcons
};

export default icons;
