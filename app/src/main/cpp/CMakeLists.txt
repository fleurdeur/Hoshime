cmake_minimum_required(VERSION 3.22.1)

project("hoshime-native")

# Adds the C++ source files
add_library(
    hoshime-native
    SHARED
    native-lib.cpp
    hoshime_engine.cpp
)

# Searches for a specified prebuilt library and stores the path as a variable
find_library(
    log-lib
    log
)

# Specifies libraries CMake should link to the target library
target_link_libraries(
    hoshime-native
    ${log-lib}
)
