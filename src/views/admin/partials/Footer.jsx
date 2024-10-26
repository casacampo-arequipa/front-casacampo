/* eslint-disable no-unused-vars */
import React from "react";

export default function Footer() {
  return (
    <>
      <div class="px-3 py-2">
        <div class="text-xs md:text-sm bg-gray-200/80 rounded-lg p-1 dark:bg-gray-800">
          <div class="text-center lg:text-left">
            <div class="">
              ©
              2023 -
              <script>
                document.write(new Date().getFullYear())
              </script>, made by <a href="###"
                target="_blank"
                class="footer-link fw-medium">Dynamus Developer Team</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
