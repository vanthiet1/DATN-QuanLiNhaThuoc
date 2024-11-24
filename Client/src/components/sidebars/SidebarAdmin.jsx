import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PATH_ROUTERS_ADMIN, PATH_ROUTERS_CLIENT } from '../../utils/constant/routers';
import AppIcons from '../../components/ui/icon';
import { cn } from '../../utils/helpers/mergeClasses';
import Button from '../ui/button/Button';
import LogoImage from '../../assets/images/logo/logo1.png';
import Image from '../ui/image/Image';
import { UserContext } from '../../contexts/UserContext';


const MenuAdminItem = ({ children, isSubMenu = false, addClassNames = '', ...props }) => {
  return (
    <li
      onClick={() => handleToggleMenu()}
      className={cn('text-[16px] font-medium text-gray-500', {
        'relative cursor-pointer': isSubMenu
      })}
      {...props}
    >
      {children}
    </li>
  );
};

const dataMenu = [
  {
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon />,
    path: PATH_ROUTERS_ADMIN.DASHBOARD
  },
  {
    icon: <AppIcons.OderIcon />,
    title: 'Order',
    path: PATH_ROUTERS_ADMIN.ORDERS
  },
  {
    title: 'Product',
    icon: <AppIcons.ProductIcon />,
    subMenu: [
      {
        path: PATH_ROUTERS_ADMIN.ADD_PRODUCT,
        title: 'Add product'
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_PRODUCT,
        title: 'All product'
      }
    ]
  },
  {
    title: 'Category',
    icon: <AppIcons.CategoryIcon />,
    subMenu: [
      {
        path: PATH_ROUTERS_ADMIN.ADD_CATEGORY,
        title: 'Add Category'
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_CATEGORY,
        title: 'All Category'
      }
    ]
  },
  {
    title: 'Banner',
    icon: <AppIcons.PhotoIcon />,
    subMenu: [
      {
        path: PATH_ROUTERS_ADMIN.ADD_BANNER,
        title: 'Add Banner'
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_BANNER,
        title: 'All Banner'
      }
    ]
  },
  {
    title: 'Coupon',
    icon: <AppIcons.GiftIcon />,
    subMenu: [
      {
        path: PATH_ROUTERS_ADMIN.ADD_COUPON,
        title: 'Add Coupon'
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_COUPON,
        title: 'All Coupon'
      }
    ]
  },

  {
    title: 'Brand',
    icon: <AppIcons.BrandIcon />,
    subMenu: [
      {
        path: PATH_ROUTERS_ADMIN.ADD_BRAND,
        title: 'Add Brand'
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_BRAND,
        title: 'All Brand'
      }
    ]
  },
  {
    title: 'Pharmacy',
    icon: <AppIcons.BuildingStorefront />,
    subMenu: [
      {
        path: PATH_ROUTERS_ADMIN.ADD_PHARMARCY,
        title: 'Add Pharmacy'
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_PHARMARCY,
        title: 'All Pharmacy'
      }
    ]
  },
  {
    title: 'Blog',
    icon: <AppIcons.PencilSquare />,
    subMenu: [
      {
        path: PATH_ROUTERS_ADMIN.ADD_BLOG,
        title: 'Add Blog'
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_BLOG,
        title: 'All Blog'
      }
    ]
  },
  {
    icon: <AppIcons.UserGroup />,
    title: 'User',
    subMenu: [
      {
        path: PATH_ROUTERS_ADMIN.MANAGER_STAFF,
        title: 'Manager Staff'
      },
      {
        path: PATH_ROUTERS_ADMIN.MANAGER_ACCOUNT,
        title: 'Manager Account'
      },
      {
        path: PATH_ROUTERS_ADMIN.MANAGER_CUSTOMER,
        title: 'Manager Customer'
      }
    ]
  },

  {
    icon: <AppIcons.UserIcon />,
    title: 'Role',
    subMenu: [
      {
        icon: <AppIcons.UserGroup />,
        title: 'All Role',
        path: PATH_ROUTERS_ADMIN.ALL_ROLE_USER
      },
      {
        icon: <AppIcons.PencilSquare />,
        title: 'Add Role',
        path: PATH_ROUTERS_ADMIN.ADD_ROLE_USER
      }
    ]
  },

  {
    icon: <AppIcons.CommentIcon />,
    title: 'Comment',
    path: PATH_ROUTERS_ADMIN.ALL_COMMENT
  },

  {
    icon: <AppIcons.ChatIcon />,
    title: 'Messages',
    path: PATH_ROUTERS_ADMIN.MESSAGES
  },
  {
    icon: <AppIcons.BanknotesIcon />,
    title: 'Transaction',
    path: PATH_ROUTERS_ADMIN.TRANSACTION
  },
  {
    icon: <AppIcons.ArrowLeftCircle />,
    title: 'HomePage',
    path: PATH_ROUTERS_CLIENT.HOMEPAGE
  },
  {
    icon: <AppIcons.SetIcon />,
    title: 'template component',
    path: PATH_ROUTERS_ADMIN.TEMPLATECOMPONENT
  }
];

const MenuAdmin = ({ data, isSubMenu = false, addClassNames = '' }) => {
  const [openMenus, setOpenMenus] = useState({});
  const { user } = useContext(UserContext);
  const handleToggleMenu = (title) => {
    if (title === false) return;
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [title]: !prevOpenMenus[title]
    }));
  };

  return (
    <ul
      className={cn(
        'space-y-4',
        {
          'ml-6 mt-2 space-y-2 text-[16px] font-normal text-gray-500': isSubMenu
        },
        addClassNames
      )}
    >
      {data.length > 0 &&
        data.map((menu, index) => {
          const { title, subMenu, path, icon } = menu;
          const isOpen = openMenus[title];
          if (user?.role_id?.role_Name !== 'admin'
            && title.includes('Role')) {
            return null;
          }
          if (!subMenu) {
            return (
              <MenuAdminItem isSubMenu={false} key={index + title} onClick={() => handleToggleMenu(false)}>
                <Link to={path} className='transition-colors hover:text-blue-500'>
                  <span className='flex flex-grow'>
                    {icon && icon}
                    <span className='ml-4'>{title}</span>
                  </span>
                </Link>
              </MenuAdminItem>
            );
          } else {
            return (
              <MenuAdminItem isSubMenu={true} key={index + title} onClick={() => handleToggleMenu(title)}>
                <Button addClassNames='text-base font-medium text-gray-700 flex cursor-pointer w-full'>
                  <span className='flex flex-grow'>
                    {icon && icon}
                    <span className='ml-4'>{title}</span>
                  </span>
                  <AppIcons.ArrowDownIcon
                    addClassNames={cn('transition-transform duration-300', {
                      'rotate-180': isOpen
                    })}
                  />
                </Button>
                <MenuAdmin
                  data={subMenu}
                  isSubMenu={true}
                  addClassNames={('transition-all duration-500', { hidden: !isOpen, block: isOpen })}
                />
              </MenuAdminItem>
            );
          }
        })}
    </ul>
  );
};

const SidebarAdmin = () => {
  return (
    <aside className='w-[270px] hidden lg:block overflow-y-auto' id='sider-bar-main'>
      <h1 className='p-4 font-bold text-lg'>
        <Link to={PATH_ROUTERS_ADMIN.DASHBOARD}>
          <Image src={LogoImage} alt='img-logo'></Image>
        </Link>
      </h1>
      <div className='p-4' id='menu-admin-wrapper'>
        <MenuAdmin data={dataMenu} />
      </div>
    </aside>
  );
};

export default SidebarAdmin;
