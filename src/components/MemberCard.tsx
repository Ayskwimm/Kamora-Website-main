import React from 'react';

interface MemberCardProps {
  name: string;
  role: string;
  avatar?: string;
}

const MemberCard: React.FC<MemberCardProps> = ({ name, role, avatar }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleColor = () => {
    const roleColors: { [key: string]: string } = {
      'Founder': 'bg-kamora-orange',
      'Chef': 'bg-kamora-red',
      'Operations': 'bg-green-500',
      'Marketing': 'bg-blue-500',
      'Manager': 'bg-purple-500',
      'Developer': 'bg-indigo-500',
      'Designer': 'bg-pink-500',
      'Consultant': 'bg-yellow-500',
      'Advisor': 'bg-teal-500',
      'Specialist': 'bg-orange-500',
    };
    return roleColors[role] || 'bg-gray-500';
  };

  return (
    <div className="card p-6 text-center hover:scale-105 transition-transform duration-300 h-full">
      <div className="flex items-center justify-center mb-4">
        {avatar ? (
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ) : (
          <div className={`w-20 h-20 rounded-full ${getRoleColor()} flex items-center justify-center text-white text-2xl font-bold`}>
            {getInitials(name)}
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold text-kamora-dark mb-2">{name}</h3>
      <p className="text-sm text-kamora-orange font-medium">{role}</p>
    </div>
  );
};

export default MemberCard;
