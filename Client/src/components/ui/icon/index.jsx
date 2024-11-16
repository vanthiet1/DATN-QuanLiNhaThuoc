import React from 'react';

const HomeIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
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
      className={`${addClassNames}`}
    >
      <path
        d='M3 12L12 2m0 0l9 10M12 2v20'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className={addClassNames}
      />
      <path d='M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z' />
      <path d='m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z' />
    </svg>
  );
};

const OderIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='currentColor'
      className={addClassNames}
    >
      <path
        fillRule='evenodd'
        d='M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z'
        clipRule='evenodd'
      />
    </svg>
  );
};

const ProductIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns='http://www.w3.org/2000/svg'
      className={`${addClassNames}`}
      viewBox='0 0 20 20'
      fill='currentColor'
      aria-hidden='true'
    >
      <path d='M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z'></path>
      <path d='M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z'></path>
    </svg>
  );
};

const CustomerIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
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
        fillRule='evenodd'
        d='M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z'
        clipRule='evenodd'
      />
    </svg>
  );
};

const UserIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      width={width}
      height={height}
      className={`${addClassNames}`}
    >
      <path
        fillRule='evenodd'
        d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z'
        clipRule='evenodd'
      />
    </svg>
  );
};

const SetIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      width={width}
      height={height}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      stroklinecap='round'
      stroklinejoin='round'
      strokeWidth='2'
      className={`${addClassNames}`}
      aria-hidden='true'
    >
      <path d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'></path>
      <path d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'></path>
    </svg>
  );
};

const LogIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      width={width}
      height={height}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      stroklinecap='round'
      stroklinejoin='round'
      strokeWidth='2'
      className={`${addClassNames}`}
      aria-hidden='true'
    >
      <path d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'></path>
    </svg>
  );
};

const DarkIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      width={width}
      height={height}
      fill='currentColor'
      viewBox='0 0 20 20'
      className={addClassNames}
      aria-hidden='true'
    >
      <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'></path>
    </svg>
  );
};

const LightIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      width={width}
      height={height}
      fill='currentColor'
      viewBox='0 0 20 20'
      className={`${addClassNames}`}
      aria-hidden='true'
    >
      <path
        fillRule='evenodd'
        d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
};

const NotiIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      width={width}
      height={height}
      fill='currentColor'
      viewBox='0 0 20 20'
      className={`${addClassNames}`}
      aria-hidden='true'
    >
      <path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z'></path>
    </svg>
  );
};

const CashIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg width={width} height={height} className={`${addClassNames}`} fill='currentColor' viewBox='0 0 20 20'>
      <path
        fillRule='evenodd'
        d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
};

const ChatIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg width={width} height={height} className={`${addClassNames}`} fill='currentColor' viewBox='0 0 20 20'>
      <path
        fillRule='evenodd'
        d='M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
};

const SearchIcons = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      width={width}
      height={height}
      className={`${addClassNames}`}
      viewBox='0 0 20 20'
      aria-hidden='true'
      fill='currentColor'
    >
      <path
        fillRule='evenodd'
        d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
};

const ArrowDownIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      fill='currentColor'
      width={width}
      height={height}
      viewBox='0 0 20 20'
      className={`${addClassNames}`}
      aria-hidden='true'
    >
      <path
        fillRule='evenodd'
        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
};

const CategoryIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 576 512'
      fill='currentColor'
      className={addClassNames}
    >
      <path d='M64 144c0-26.5 21.5-48 48-48s48 21.5 48 48l0 112-96 0 0-112zM0 144L0 368c0 61.9 50.1 112 112 112s112-50.1 112-112l0-178.4c1.8 19.1 8.2 38 19.8 54.8L372.3 431.7c35.5 51.7 105.3 64.3 156 28.1s63-107.5 27.5-159.2L427.3 113.3C391.8 61.5 321.9 49 271.3 85.2c-28 20-44.3 50.8-47.3 83l0-24.2c0-61.9-50.1-112-112-112S0 82.1 0 144zm296.6 64.2c-16-23.3-10-55.3 11.9-71c21.2-15.1 50.5-10.3 66 12.2l67 97.6L361.6 303l-65-94.8zM491 407.7c-.8 .6-1.6 1.1-2.4 1.6l4-2.8c-.5 .4-1 .8-1.6 1.2z' />
    </svg>
  );
};

const PhotoIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='currentColor'
      className={addClassNames}
    >
      <path
        fillRule='evenodd'
        d='M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z'
        clipRule='evenodd'
      />
    </svg>
  );
};

const PencilSquare = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='currentColor'
      className={addClassNames}
    >
      <path d='M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z' />
      <path d='M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z' />
    </svg>
  );
};

const UserGroup = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='currentColor'
      className={addClassNames}
    >
      <path
        fillRule='evenodd'
        d='M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z'
        clipRule='evenodd'
      />
      <path d='M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z' />
    </svg>
  );
};

const BuildingStorefront = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='currentColor'
      className={addClassNames}
    >
      <path d='M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 0 0 7.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 0 0 4.902-5.652l-1.3-1.299a1.875 1.875 0 0 0-1.325-.549H5.223Z' />
      <path
        fillRule='evenodd'
        d='M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 0 0 9.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 0 0 2.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Zm3-6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Zm8.25-.75a.75.75 0 0 0-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5.25a.75.75 0 0 0-.75-.75h-3Z'
        clipRule='evenodd'
      />
    </svg>
  );
};

const GiftIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='currentColor'
      className={addClassNames}
    >
      <path d='M9.375 3a1.875 1.875 0 0 0 0 3.75h1.875v4.5H3.375A1.875 1.875 0 0 1 1.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0 1 12 2.753a3.375 3.375 0 0 1 5.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 1 0-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3ZM11.25 12.75H3v6.75a2.25 2.25 0 0 0 2.25 2.25h6v-9ZM12.75 12.75v9h6.75a2.25 2.25 0 0 0 2.25-2.25v-6.75h-9Z' />
    </svg>
  );
};

const BrandIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='currentColor'
      className={addClassNames}
    >
      <path
        fillRule='evenodd'
        d='M11.99 2.243a4.49 4.49 0 0 0-3.398 1.55 4.49 4.49 0 0 0-3.497 1.306 4.491 4.491 0 0 0-1.307 3.498 4.491 4.491 0 0 0-1.548 3.397c0 1.357.6 2.573 1.548 3.397a4.491 4.491 0 0 0 1.307 3.498 4.49 4.49 0 0 0 3.498 1.307 4.49 4.49 0 0 0 3.397 1.549 4.49 4.49 0 0 0 3.397-1.549 4.49 4.49 0 0 0 3.497-1.307 4.491 4.491 0 0 0 1.306-3.497 4.491 4.491 0 0 0 1.55-3.398c0-1.357-.601-2.573-1.549-3.397a4.491 4.491 0 0 0-1.307-3.498 4.49 4.49 0 0 0-3.498-1.307 4.49 4.49 0 0 0-3.396-1.549Zm3.53 7.28a.75.75 0 0 0-1.06-1.06l-6 6a.75.75 0 1 0 1.06 1.06l6-6Zm-5.78-.905a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm4.5 4.5a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z'
        clipRule='evenodd'
      />
    </svg>
  );
};

const BanknotesIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='currentColor'
      className={addClassNames}
    >
      <path d='M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z' />
      <path
        fillRule='evenodd'
        d='M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z'
        clipRule='evenodd'
      />
      <path d='M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z' />
    </svg>
  );
};

const PlusIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={addClassNames}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
    </svg>
  );
};

const TrashBinIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg fill='currentColor' viewBox='0 0 20 20' className={addClassNames} width={width} height={height}>
      <path
        fillRule='evenodd'
        d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
};

const X_CloseIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      fill='currentColor'
      viewBox='0 0 20 20'
      aria-hidden='true'
      className={addClassNames}
      width={width}
      height={height}
    >
      <path
        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
        clipRule='evenodd'
        fillRule='evenodd'
      ></path>
    </svg>
  );
};

const EyeIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      width={width}
      height={height}
      className={`${addClassNames}`}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
      />
      <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
    </svg>
  );
};

const BarsThreeIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      width={width}
      height={height}
      className={`${addClassNames}`}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
    </svg>
  );
};

const SquaresTwoxTwoIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      width={width}
      height={height}
      className={`${addClassNames}`}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z'
      />
    </svg>
  );
};

const CommentIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      fill='currentColor'
      width={width}
      height={height}
      className={`${addClassNames}`}
    >
      <path d='M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9l.3-.5z' />
    </svg>
  );
};

const EditIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      fill='currentColor'
      viewBox='0 0 20 20'
      className={addClassNames}
      aria-hidden='true'
      width={width}
      height={height}
    >
      <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path>
    </svg>
  );
};
const LocationIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      fill='currentColor'
      viewBox='0 0 24 24'
      className={addClassNames}
      aria-hidden='true'
      width={width}
      height={height}
    >
      <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 12 7 12s7-6.75 7-12c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'></path>
    </svg>
  );
};
const ArrowDown = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      className={addClassNames}
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.293 9.293a1 1 0 0 1 1.414 0L12 12.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z'
        fill='#000000'
      ></path>
    </svg>
  );
};

const ArrowLeftCircle = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className={addClassNames}
      aria-hidden='true'
      width={width}
      height={height}
    >
      <path
        fillRule='evenodd'
        d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z'
        clipRule='evenodd'
      />
    </svg>
  );
};
const ArrowRight = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={`icon-arrow ${addClassNames}`}
      width={width}
      height={height}
    >
      <polyline points='9 18 15 12 9 6'></polyline>
    </svg>
  );
};

const PrinterIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className={addClassNames}
      aria-hidden='true'
      width={width}
      height={height}
    >
      <path
        fillRule='evenodd'
        d='M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 0 0 3 3h.27l-.155 1.705A1.875 1.875 0 0 0 7.232 22.5h9.536a1.875 1.875 0 0 0 1.867-2.045l-.155-1.705h.27a3 3 0 0 0 3-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0 0 18 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM16.5 6.205v-2.83A.375.375 0 0 0 16.125 3h-8.25a.375.375 0 0 0-.375.375v2.83a49.353 49.353 0 0 1 9 0Zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 0 1-.374.409H7.232a.375.375 0 0 1-.374-.409l.526-5.784a.373.373 0 0 1 .333-.337 41.741 41.741 0 0 1 8.566 0Zm.967-3.97a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V10.5ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15Z'
        clipRule='evenodd'
      />
    </svg>
  );
};
const AddToCartSuccsessIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 200 200'
      className={addClassNames}
      width={width}
      height={height}
    >
      <path
        d='M69.2161 60.3997C69.1871 60.3997 69.1581 60.3997 69.1581 60.3708L12.5714 28.5067C12.5133 28.4777 12.4843 28.3909 12.5133 28.3041C12.5424 28.2462 12.6295 28.2173 12.7166 28.2462L69.2161 60.0813L98.1047 43.4403C98.1627 43.4113 98.2498 43.4113 98.3079 43.4981C98.3369 43.556 98.3369 43.6428 98.2498 43.7007L69.2742 60.3708C69.2742 60.3997 69.2452 60.3997 69.2161 60.3997Z'
        fill='#E0E0E0'
      ></path>
      <path
        d='M62.5387 89.8908C62.5097 89.8908 62.4807 89.8908 62.4807 89.8619L20.1495 65.5225C20.1205 65.4935 20.0915 65.4646 20.0915 65.4357L12.5427 28.4201C12.5137 28.3333 12.5717 28.2754 12.6588 28.2465C12.7459 28.2175 12.804 28.2754 12.833 28.3622L20.3818 65.291L62.5968 89.5725L91.4272 72.9893L98.105 43.5563C98.134 43.4694 98.1921 43.4405 98.2792 43.4405C98.3663 43.4694 98.3953 43.5273 98.3953 43.6141L91.7176 73.105C91.7176 73.134 91.6885 73.1919 91.6595 73.1919L62.6839 89.8619C62.5968 89.8908 62.5678 89.8908 62.5387 89.8908Z'
        fill='#E0E0E0'
      ></path>
      <path
        d='M62.5377 89.8909H62.5087C62.4216 89.862 62.3926 89.8041 62.3926 89.7173L69.0703 60.2264C69.0994 60.1395 69.1574 60.1106 69.2445 60.1106C69.3316 60.1395 69.3607 60.1974 69.3607 60.2842L62.6829 89.7751C62.6539 89.862 62.5958 89.8909 62.5377 89.8909Z'
        fill='#E0E0E0'
      ></path>
      <path
        d='M69.7965 85.7235H69.7675C69.6804 85.6945 69.6514 85.6367 69.6514 85.5498L76.3291 56.0589C76.3581 55.9721 76.4162 55.9432 76.5033 55.9432C76.5904 55.9721 76.6195 56.03 76.6195 56.1168L69.9417 85.6077C69.9127 85.6945 69.8546 85.7235 69.7965 85.7235Z'
        fill='#E0E0E0'
      ></path>
      <path
        d='M77.0265 81.5558H76.9975C76.9104 81.5269 76.8813 81.469 76.8813 81.3822L83.5591 51.8913C83.5881 51.8045 83.6462 51.7755 83.7333 51.7755C83.8204 51.8045 83.8494 51.8623 83.8494 51.9492L77.1717 81.4401C77.1427 81.5269 77.0846 81.5558 77.0265 81.5558Z'
        fill='#E0E0E0'
      ></path>
      <path
        d='M84.255 77.3885H84.226C84.1389 77.3596 84.1099 77.3017 84.1099 77.2149L90.7876 47.724C90.8166 47.6372 90.8747 47.6082 90.9618 47.6082C91.0489 47.6372 91.0779 47.695 91.0779 47.7819L84.4002 77.2728C84.4002 77.3596 84.3421 77.3885 84.255 77.3885Z'
        fill='#E0E0E0'
      ></path>
      <path
        d='M25.4916 68.5903C25.4335 68.5903 25.3464 68.5324 25.3464 68.4745L21.2236 33.3112C21.2236 33.2244 21.2817 33.1665 21.3398 33.1375C21.4269 33.1375 21.4849 33.1954 21.514 33.2533L25.6658 68.3877C25.6658 68.5035 25.6077 68.5613 25.4916 68.5903C25.5206 68.5903 25.5206 68.5903 25.4916 68.5903Z'
        fill='#E0E0E0'
      ></path>
      <path
        d='M30.8047 71.6291C30.7176 71.6291 30.6596 71.5713 30.6596 71.4844L28.2788 37.2761C28.2788 37.1893 28.3369 37.1314 28.424 37.1314C28.5111 37.1314 28.5691 37.1893 28.5691 37.2761L30.9499 71.4844C30.9499 71.5423 30.8918 71.6291 30.8047 71.6291Z'
        fill='#E0E0E0'
      ></path>
      <path
        d='M36.0881 74.6679C36.001 74.6679 35.9429 74.61 35.9429 74.5232L35.6816 41.4436C35.6816 41.3567 35.7397 41.2989 35.8268 41.2989C35.8849 41.2989 35.972 41.3567 35.972 41.4436L36.2333 74.5232C36.2333 74.61 36.1752 74.6679 36.0881 74.6679Z'
        fill='#E0E0E0'
      ></path>
      <path
        d='M41.3732 77.7354C41.2861 77.7354 41.228 77.6775 41.228 77.5907L42.4184 45.2635C42.4184 45.1767 42.5055 45.1188 42.5636 45.1188C42.6507 45.1188 42.7087 45.1767 42.7087 45.2635L41.5184 77.5907C41.5184 77.6485 41.4603 77.7354 41.3732 77.7354Z'
        fill='#E0E0E0'
      ></path>
      <path
        d='M46.6569 80.7744C46.5698 80.7744 46.5117 80.6876 46.5117 80.6297L49.0086 48.9683C49.0086 48.8814 49.0957 48.8235 49.1538 48.8235C49.2409 48.8235 49.299 48.9104 49.299 48.9683L46.8021 80.6297C46.8021 80.7166 46.744 80.7744 46.6569 80.7744Z'
        fill='#E0E0E0'
      ></path>
      <path
        d='M51.9704 83.8131C51.9413 83.8131 51.9413 83.8131 51.9704 83.8131C51.8833 83.8131 51.8252 83.7263 51.8252 83.6395L55.7157 52.7015C55.7157 52.6147 55.8028 52.5568 55.8899 52.5858C55.977 52.5858 56.0351 52.6726 56.006 52.7594L52.1155 83.6974C52.0865 83.7553 52.0284 83.8131 51.9704 83.8131Z'
        fill='#E0E0E0'
      ></path>
      <path
        d='M57.2541 86.8517C57.1379 86.8228 57.1089 86.7649 57.1089 86.6781L62.5963 56.4926C62.5963 56.4058 62.6834 56.3479 62.7705 56.3769C62.8576 56.3769 62.9156 56.4637 62.8866 56.5505L57.3992 86.736C57.3702 86.7939 57.3121 86.8517 57.2541 86.8517Z'
        fill='#E0E0E0'
      ></path>
      <path
        d='M69.2161 60.3997C69.1871 60.3997 69.1581 60.3997 69.1581 60.3708L12.5714 28.5067C12.5133 28.4777 12.4843 28.3909 12.5133 28.3041C12.5424 28.2462 12.6295 28.2173 12.7166 28.2462L69.2161 60.0813L98.1047 43.4403C98.1627 43.4113 98.2498 43.4113 98.3079 43.4981C98.3369 43.556 98.3369 43.6428 98.2498 43.7007L69.2742 60.3708C69.2742 60.3997 69.2452 60.3997 69.2161 60.3997Z'
        fill='#E0E0E0'
      ></path>
      <path
        d='M67.5607 67.78C67.5317 67.78 67.5027 67.78 67.5027 67.751L14.4581 37.3919C14.4001 37.363 14.371 37.2761 14.4001 37.1893C14.4291 37.1314 14.5162 37.1025 14.6033 37.1314L67.5607 67.4616L96.4493 50.8205C96.5073 50.7916 96.5944 50.7916 96.6525 50.8784C96.6815 50.9363 96.6815 51.0231 96.5944 51.081L67.6188 67.751C67.5898 67.78 67.5898 67.78 67.5607 67.78Z'
        fill='#E0E0E0'
      ></path>
      <path
        d='M65.8773 75.1598C65.8483 75.1598 65.8192 75.1598 65.8192 75.1309L16.3458 46.7397C16.2878 46.7108 16.2587 46.624 16.2878 46.5372C16.3168 46.4793 16.4039 46.4503 16.491 46.4793L65.8773 74.8125L94.7658 58.1715C94.8239 58.1425 94.911 58.1425 94.9691 58.2293C94.9981 58.2872 94.9981 58.374 94.911 58.4319L65.9354 75.1019C65.9354 75.1598 65.9063 75.1598 65.8773 75.1598Z'
        fill='#E0E0E0'
      ></path>
      <path
        d='M64.2226 82.5398C64.1936 82.5398 64.1645 82.5398 64.1355 82.5109L18.2042 55.8851C18.1462 55.8562 18.1171 55.7694 18.1462 55.6825C18.1752 55.6247 18.2623 55.5957 18.3494 55.6247L64.1936 82.1925L93.0821 65.5514C93.1402 65.5225 93.2273 65.5225 93.2853 65.6093C93.3144 65.6672 93.3144 65.754 93.2273 65.8119L64.2517 82.4819C64.2517 82.5109 64.2517 82.5398 64.2226 82.5398Z'
        fill='#E0E0E0'
      ></path>
      <path
        d='M62.5382 89.8908C62.5092 89.8908 62.4802 89.8908 62.4802 89.8619L20.149 65.5225C20.091 65.4935 20.0619 65.4067 20.091 65.3199C20.12 65.262 20.2071 65.2331 20.2942 65.262L62.5673 89.5725L91.4558 72.9314C91.5139 72.9024 91.601 72.9024 91.659 72.9892C91.6881 73.0471 91.6881 73.134 91.601 73.1918L62.6253 89.8619C62.5963 89.8908 62.5673 89.8908 62.5382 89.8908Z'
        fill='#E0E0E0'
      ></path>
    </svg>
  );
};

const ShoppingCartIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      className={addClassNames}
      aria-hidden='true'
      width={width}
      height={height}
      stroke-width='1.5'
      stroke='currentColor'
      class='size-6'
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
      />
    </svg>
  );
};

const UserIconOutline = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke-width='1.5'
      stroke='currentColor'
      className={addClassNames}
      aria-hidden='true'
      width={width}
      height={height}
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
      />
    </svg>
  );
};

const QueueListIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={addClassNames}
      aria-hidden='true'
      width={width}
      height={height}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z'
      />
    </svg>
  );
};
const ClipboardIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={addClassNames}
      aria-hidden='true'
      width={width}
      height={height}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75'
      />
    </svg>
  );
};

const ChatBubbleIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={addClassNames}
      aria-hidden='true'
      width={width}
      height={height}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z'
      />
    </svg>
  );
};

const WarningIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='#FFD700'
      class='size-6'
      className={addClassNames}
      aria-hidden='true'
      width={width}
      height={height}
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z'
      />
    </svg>
  );
};

const ShieldIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={addClassNames}
      aria-hidden='true'
      width={width}
      height={height}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 2.25c3.5 1.25 7 1.25 7 4.5v5.25c0 3.333-2.667 6.667-7 9-4.333-2.333-7-5.667-7-9V6.75c0-3.25 3.5-3.25 7-4.5z'
      />
      <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v4m0 3.5h.007V16.5H12z' />
    </svg>
  );
};

const TimeIcon = ({ width = '24', height = '24', addClassNames = '' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className={addClassNames}
    width={width}
    height={height}
  >
    <circle cx='12' cy='12' r='9' strokeLinecap='round' strokeLinejoin='round' />
    <path strokeLinecap='round' strokeLinejoin='round' d='M12 7v5h4' />
    <text x='12' y='16' textAnchor='middle' fontSize='8' fill='currentColor'>
      24
    </text>
  </svg>
);

const CkeckIcon = ({ width = '24', height = '24', addClassNames = '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className={addClassNames}
      aria-hidden='true'
      width={width}
      height={height}
    >
      <path
        fillRule='evenodd'
        d='M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z'
        clipRule='evenodd'
      />
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
  SearchIcons,
  ArrowDownIcon,
  PencilSquare,
  CategoryIcon,
  PhotoIcon,
  UserGroup,
  BuildingStorefront,
  GiftIcon,
  BrandIcon,
  BanknotesIcon,
  PlusIcon,
  TrashBinIcon,
  X_CloseIcon,
  EyeIcon,
  BarsThreeIcon,
  SquaresTwoxTwoIcon,
  ArrowLeftCircle,
  CommentIcon,
  EditIcon,
  LocationIcon,
  ArrowDown,
  ArrowRight,
  PrinterIcon,
  AddToCartSuccsessIcon,
  ShoppingCartIcon,
  QueueListIcon,
  ChatBubbleIcon,
  WarningIcon,
  ClipboardIcon,
  UserIconOutline,
  ShieldIcon,
  TimeIcon,
  CkeckIcon
};

export default icons;
