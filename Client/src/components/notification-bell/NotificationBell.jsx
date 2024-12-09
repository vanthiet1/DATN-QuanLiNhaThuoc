import notificationServices from '../../services/notificationService';
import formatsHelper from '../../utils/helpers/formats';
import { cn } from '../../utils/helpers/mergeClasses';
import { useHeaderNotificationBell } from '../layouts/LayoutAdmin';
import { Button } from '../ui/button';
import AppIcons from '../ui/icon';

const NotificationBell = () => {
  const { notificationData, setNotificationAction, notificationAction } = useHeaderNotificationBell();
  console.log(notificationData);

  const handleReadNotiItem = async (id) => {
    await notificationServices.updateNotificationById(id);
    setNotificationAction(!notificationAction);
  };

  const handleDeleteNotiItem = async (e, id) => {
    e.stopPropagation();
    await notificationServices.deleteNotificationById(id);
    setNotificationAction(!notificationAction);
  };

  return (
    <div id='notification-bell' className=' overflow-y-auto max-w-[300px] max-h-[320px] shadow-md rounded'>
      {!notificationData && <div>Bạn chưa có thông báo mới!</div>}
      {notificationData && notificationData.length > 0 && (
        <ul className='w-full transition-all duration-200'>
          {notificationData.map((notification) => {
            const { _id, isRead, message, category, createdAt } = notification;
            return (
              <li
                key={_id}
                className={cn(
                  'w-full text-gray-700 p-2 text-sm relative border-b border-gray-100 border-solid cursor-pointer hover:bg-gray-50',
                  { 'bg-blue-50': !isRead }
                )}
                onClick={() => handleReadNotiItem(_id)}
              >
                <p className='truncate'>{message}</p>
                <div className='flex items-center mt-2'>
                  <span className='bg-blue-100 px-2 rounded-full text-blue-600 font-medium capitalize'>{category}</span>
                  <span className='ml-2'>{formatsHelper.formatISODate(createdAt)}</span>
                </div>
                <Button
                  className='absolute top-[50%] right-[4px] hover:text-blue-700 translate-y-[-50%] z-10'
                  onClick={(e) => handleDeleteNotiItem(e, _id)}
                >
                  <AppIcons.X_CloseIcon width='14' height='14' />
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default NotificationBell;
