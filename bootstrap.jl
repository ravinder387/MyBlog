(pwd() != @__DIR__) && cd(@__DIR__) # allow starting app from bin/ dir

using MyBlog
push!(Base.modules_warned_for, Base.PkgId(MyBlog))
MyBlog.main()
