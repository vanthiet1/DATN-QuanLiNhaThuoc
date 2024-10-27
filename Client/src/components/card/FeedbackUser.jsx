
const FeedbackUser = ({avatar,username,content}) => {
    return (
        <div className="p-5 rounded-[10px] border border-1 border-[#C9C9C9]">
              <div className="flex items-center gap-2">
                 <img className="w-[50px] rounded-[50px]" src={avatar} alt="" />
                  <span className="font-semibold">{username}</span>
              </div>
                  <p className="pt-2 text-[14px]">{content}</p>
        </div>
    );
};

export default FeedbackUser;