import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { SIDEBAR_LINKS } from "../../utils/constants";
import { FiMessageCircle } from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <Card className="sticky top-0 max-w-[300px] h-screen border-r-2 w-full p-4 shadow-xl shadow-blue-gray-900/5">
      <Typography variant="h3" color="blue" className="px-4">
        ProLaptop
      </Typography>

      <hr className="my-2 border-gray-400" />

      <List>
        <ListItem onClick={() => navigate("/")}>
          <ListItemPrefix>
            <LuLayoutDashboard size={22} />
          </ListItemPrefix>
          Trang chủ
        </ListItem>

        <ListItem onClick={() => navigate("/admin/chat")}>
          <ListItemPrefix>
            <FiMessageCircle size={22} />
          </ListItemPrefix>
          Hộp thư
        </ListItem>

        {SIDEBAR_LINKS.map((section, index) => (
          <Accordion
            key={section.title}
            open={open === index}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === index ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0">
              <AccordionHeader
                onClick={() => handleOpen(index)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>{section.icon}</ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  {section.title}
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                {section.items.map((each) => (
                  <ListItem
                    key={each.text}
                    onClick={() => navigate(each.navigateTo)}
                    className="pl-8"
                  >
                    <ListItemPrefix>{each.prefixIcon}</ListItemPrefix>
                    {each.text}
                  </ListItem>
                ))}
              </List>
            </AccordionBody>
          </Accordion>
        ))}

        <hr className="my-2 border-gray-400" />

        <ListItem>
          <ListItemPrefix>
            <IoMdLogOut size={22} />
          </ListItemPrefix>
          Đăng xuất
        </ListItem>
      </List>
    </Card>
  );
};

export default Sidebar;
