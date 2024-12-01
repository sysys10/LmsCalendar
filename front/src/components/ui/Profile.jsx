const Profile = ({ user }) => {
  if (user) {
    return (
      <div className="w-full px-4 pt-16">
        <div className="flex items-center">
          <div className="w-16 h-16">
            <img src={user.thumbnail_image} className="rounded-full" />
          </div>
          <div className="flex-1">
            <div>{user.nickname}</div>
          </div>
        </div>
      </div>
    );
  } else return <div>로그인 해조</div>;
};

export default Profile;
