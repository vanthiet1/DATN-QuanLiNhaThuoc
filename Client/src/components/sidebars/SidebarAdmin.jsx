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
    title: 'Thống kê',
    icon: <AppIcons.HomeIcon />,
    path: PATH_ROUTERS_ADMIN.DASHBOARD
  },
  {
    icon: <AppIcons.OderIcon />,
    title: 'Quản lí đơn hàng',
    path: PATH_ROUTERS_ADMIN.ORDERS
  },
  {
    title: 'Quản lí sản phẩm',
    icon: <AppIcons.ProductIcon />,
    subMenu: [
      {
        path: PATH_ROUTERS_ADMIN.ADD_PRODUCT,
        title: 'Tạo sản phẩm'
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_PRODUCT,
        title: 'Tất cả sản phẩm'
      }
    ]
  },
  {
    title: 'Quản lí danh mục',
    icon: <AppIcons.CategoryIcon />,
    subMenu: [
      {
        path: PATH_ROUTERS_ADMIN.ADD_CATEGORY,
        title: 'Thêm danh mục'
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_CATEGORY,
        title: 'Tất cả danh mục'
      }
    ]
  },
  {
    title: 'Quản lí banner',
    icon: <AppIcons.PhotoIcon />,
    subMenu: [
      {
        path: PATH_ROUTERS_ADMIN.ADD_BANNER,
        title: 'Thêm Banner'
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_BANNER,
        title: 'Tất cả Banner'
      }
    ]
  },
  {
    title: 'Quản lí mã giảm giá',
    icon: <AppIcons.GiftIcon />,
    subMenu: [
      {
        path: PATH_ROUTERS_ADMIN.ADD_COUPON,
        title: 'Thêm mã giảm giá'
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_COUPON,
        title: 'Tất cả mã giảm giá'
      }
    ]
  },

  {
    title: 'Quản lí thương hiệu',
    icon: <AppIcons.BrandIcon />,
    subMenu: [
      {
        path: PATH_ROUTERS_ADMIN.ADD_BRAND,
        title: 'Thêm thương hiệu'
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_BRAND,
        title: 'Tất cả thương hiệu'
      }
    ]
  },
  {
    title: 'Nhà thuốc',
    icon: <AppIcons.BuildingStorefront />,
    subMenu: [
      {
        path: PATH_ROUTERS_ADMIN.ADD_PHARMARCY,
        title: 'Thêm nhà thuốc'
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_PHARMARCY,
        title: 'Tất cả nhà thuốc'
      }
    ]
  },
  {
    title: 'Quản lí bài viết',
    icon: <AppIcons.PencilSquare />,
    subMenu: [
      {
        path: PATH_ROUTERS_ADMIN.ADD_BLOG,
        title: 'Thêm bài viết'
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_BLOG,
        title: 'Tất cả bài viết'
      }
    ]
  },
  {
    icon: <AppIcons.UserGroup />,
    title: 'Quản lí tài khoản',
    subMenu: [
      {
        path: PATH_ROUTERS_ADMIN.MANAGER_STAFF,
        title: 'Nhân viên'
      },
      {
        path: PATH_ROUTERS_ADMIN.MANAGER_ACCOUNT,
        title: 'Tất cả tài khoản'
      },
      {
        path: PATH_ROUTERS_ADMIN.MANAGER_CUSTOMER,
        title: 'Khách hàng'
      }
    ]
  },

  {
    icon: <AppIcons.UserIcon />,
    title: 'Quản lí vai trò',
    subMenu: [
      {
        icon: <AppIcons.UserGroup />,
        title: 'Tất cả vai trò',
        path: PATH_ROUTERS_ADMIN.ALL_ROLE_USER
      },
      {
        icon: <AppIcons.PencilSquare />,
        title: 'Thêm vai trò',
        path: PATH_ROUTERS_ADMIN.ADD_ROLE_USER
      }
    ]
  },

  {
    icon: <AppIcons.CommentIcon />,
    title: 'Quản lí bình luận',
    path: PATH_ROUTERS_ADMIN.ALL_COMMENT
  },

  {
    icon: <AppIcons.ChatIcon />,
    title: 'Trò chuyện',
    path: PATH_ROUTERS_ADMIN.MESSAGES
  },
  {
    icon: <AppIcons.BanknotesIcon />,
    title: 'Quản lí giao dịch',
    path: PATH_ROUTERS_ADMIN.TRANSACTION
  },
  {
    icon: <AppIcons.ArrowLeftCircle />,
    title: 'Quay về trang chủ',
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
