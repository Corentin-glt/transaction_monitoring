import {
  Bars3BottomRightIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid';
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from '@transaction-monitoring/client-components';
import {
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Menu {
  title: string;
  link: string;
  icon: string;
}

const menu: Menu[] = [
  { title: 'Transactions', link: '/', icon: '🏦' },
  {
    title: 'Alerts',
    link: '/alerts',
    icon: '🔔',
  },
  {
    title: 'Rules',
    link: '/rules',
    icon: '🏗️',
  },
  {
    title: 'Scenario',
    link: '/scenarios',
    icon: '📖',
  },
];

const NavbarComponent: FunctionComponent = function () {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<Menu>(
    menu[0]
  );

  useEffect(() => {
    if (location.pathname === '/') {
      return setActiveMenu(menu[0]);
    }
    const otherMenus = menu.slice(1);
    const newMenuSelected = otherMenus.find((m) =>
      location.pathname.includes(m.link)
    );
    if (!newMenuSelected) return setActiveMenu(menu[0]);
    return setActiveMenu(newMenuSelected);
  }, [location]);

  const handleClick = (menu: Menu) => {
    return navigate(menu.link);
  };

  return (
    <Navbar>
      <span className="dark:text-zinc-100">
        Transaction Monitoring
      </span>
      <NavbarDivider />
      <NavbarSection>
        {menu.map((item) => (
          <NavbarItem
            className="hover:cursor-pointer"
            key={item.link}
            onClick={() => handleClick(item)}
            current={item.link === activeMenu.link}
          >
            {item.icon + ' '}
            {item.title}
          </NavbarItem>
        ))}
      </NavbarSection>
      <NavbarSpacer />
      <Dropdown>
        <DropdownButton as={NavbarItem}>
          <Bars3BottomRightIcon className="w-5 h-5" />
        </DropdownButton>
        <DropdownMenu
          className="min-w-64"
          anchor="bottom start"
        >
          <DropdownItem
            onClick={() => navigate('/transactions/add')}
          >
            <DropdownLabel>Bulk transactions</DropdownLabel>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem
            onClick={() => navigate('/rules/add')}
          >
            <DropdownLabel>Create a new rule</DropdownLabel>
          </DropdownItem>
          <DropdownItem
            onClick={() => navigate('/scenarios/add')}
          >
            <DropdownLabel>
              Create a new scenario
            </DropdownLabel>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Navbar>
  );
};

export default NavbarComponent;
