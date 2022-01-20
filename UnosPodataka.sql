USE [Cinema]
GO
SET IDENTITY_INSERT [dbo].[Cinema] ON 

INSERT [dbo].[Cinema] ([ID], [Name], [City], [Address]) VALUES (1, N'Bioskop Fox', N'Nis', N'Kod konja')
INSERT [dbo].[Cinema] ([ID], [Name], [City], [Address]) VALUES (2, N'Cinemagija', N'Beograd', N'Ustanicka 5')
SET IDENTITY_INSERT [dbo].[Cinema] OFF
GO
SET IDENTITY_INSERT [dbo].[Hall] ON 

INSERT [dbo].[Hall] ([ID], [Name], [Rows], [SeatsPerRow]) VALUES (1, N'Screen 1', 10, 9)
INSERT [dbo].[Hall] ([ID], [Name], [Rows], [SeatsPerRow]) VALUES (2, N'Screen 2', 6, 10)
INSERT [dbo].[Hall] ([ID], [Name], [Rows], [SeatsPerRow]) VALUES (3, N'Screen 3', 14, 20)
SET IDENTITY_INSERT [dbo].[Hall] OFF
GO
SET IDENTITY_INSERT [dbo].[Movie] ON 

INSERT [dbo].[Movie] ([ID], [Name], [PlotSummary], [PosterPath], [Length], [Year], [Country], [Director]) VALUES (1, N'American Psycho', N'A wealthy New York City investment banking executive, Patrick Bateman, hides his alternate psychopathic ego from his co-workers and friends as he delves deeper into his violent, hedonistic fantasies.', N'./images/posters/AmericanPsycho2000.jpg', 101, 2000, N'United States', N'Mary Harron')
INSERT [dbo].[Movie] ([ID], [Name], [PlotSummary], [PosterPath], [Length], [Year], [Country], [Director]) VALUES (2, N'Gladiator', N'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', N'./images/posters/Gladiator2000.jpg', 155, 2000, N'United States', N'Ridley Scott')
INSERT [dbo].[Movie] ([ID], [Name], [PlotSummary], [PosterPath], [Length], [Year], [Country], [Director]) VALUES (3, N'Scarface', N'In 1980 Miami, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.', N'./images/posters/Scarface1983.jpg', 170, 1983, N'United States', N'Brian De Palma')
INSERT [dbo].[Movie] ([ID], [Name], [PlotSummary], [PosterPath], [Length], [Year], [Country], [Director]) VALUES (4, N'Monty Python and the Holy Grail', N'King Arthur and his Knights of the Round Table embark on a surreal, low-budget search for the Holy Grail, encountering many, very silly obstacles.', N'./images/posters/MontyPythonandtheHolyGrail1975.jpg', 91, 1975, N'United Kingdom', N'Terry Gilliam')
INSERT [dbo].[Movie] ([ID], [Name], [PlotSummary], [PosterPath], [Length], [Year], [Country], [Director]) VALUES (5, N'The Lobster', N'In a dystopian near future, single people, according to the laws of The City, are taken to The Hotel, where they are obliged to find a romantic partner in forty-five days or are transformed into beasts and sent off into The Woods.', N'./images/posters/TheLobster2015.jpg', 119, 2015, N'Ireland', N'Yorgos Lanthimos')
INSERT [dbo].[Movie] ([ID], [Name], [PlotSummary], [PosterPath], [Length], [Year], [Country], [Director]) VALUES (6, N'Baby Driver', N'After being coerced into working for a crime boss, a young getaway driver finds himself taking part in a heist doomed to fail.', N'./images/posters/BabyDriver2017.jpg', 113, 2017, N'United Kingdom', N'Edgar Wright')
SET IDENTITY_INSERT [dbo].[Movie] OFF
GO
SET IDENTITY_INSERT [dbo].[Screening] ON 

INSERT [dbo].[Screening] ([ID], [CinemaID], [MovieID], [HallID], [DateAndTime], [TicketPrice]) VALUES (1, 1, 1, 1, CAST(N'2022-01-21T19:00:00.0000000' AS DateTime2), 250)
INSERT [dbo].[Screening] ([ID], [CinemaID], [MovieID], [HallID], [DateAndTime], [TicketPrice]) VALUES (2, 1, 1, 2, CAST(N'2022-01-22T20:00:00.0000000' AS DateTime2), 300)
INSERT [dbo].[Screening] ([ID], [CinemaID], [MovieID], [HallID], [DateAndTime], [TicketPrice]) VALUES (3, 1, 2, 3, CAST(N'2022-01-23T20:00:00.0000000' AS DateTime2), 200)
INSERT [dbo].[Screening] ([ID], [CinemaID], [MovieID], [HallID], [DateAndTime], [TicketPrice]) VALUES (4, 1, 3, 2, CAST(N'2022-01-23T19:00:00.0000000' AS DateTime2), 300)
INSERT [dbo].[Screening] ([ID], [CinemaID], [MovieID], [HallID], [DateAndTime], [TicketPrice]) VALUES (5, 1, 3, 1, CAST(N'2022-01-24T20:00:00.0000000' AS DateTime2), 300)
INSERT [dbo].[Screening] ([ID], [CinemaID], [MovieID], [HallID], [DateAndTime], [TicketPrice]) VALUES (6, 1, 4, 1, CAST(N'2022-01-26T20:00:00.0000000' AS DateTime2), 300)
INSERT [dbo].[Screening] ([ID], [CinemaID], [MovieID], [HallID], [DateAndTime], [TicketPrice]) VALUES (7, 1, 5, 1, CAST(N'2022-01-22T18:00:00.0000000' AS DateTime2), 300)
INSERT [dbo].[Screening] ([ID], [CinemaID], [MovieID], [HallID], [DateAndTime], [TicketPrice]) VALUES (8, 2, 3, 1, CAST(N'2022-01-20T20:00:00.0000000' AS DateTime2), 250)
INSERT [dbo].[Screening] ([ID], [CinemaID], [MovieID], [HallID], [DateAndTime], [TicketPrice]) VALUES (9, 2, 6, 1, CAST(N'2022-01-24T20:00:00.0000000' AS DateTime2), 250)
INSERT [dbo].[Screening] ([ID], [CinemaID], [MovieID], [HallID], [DateAndTime], [TicketPrice]) VALUES (1009, 1, 1, 2, CAST(N'2022-01-21T20:00:00.0000000' AS DateTime2), 250)
SET IDENTITY_INSERT [dbo].[Screening] OFF
GO
SET IDENTITY_INSERT [dbo].[Genre] ON 

INSERT [dbo].[Genre] ([ID], [Name]) VALUES (1, N'Crime')
INSERT [dbo].[Genre] ([ID], [Name]) VALUES (2, N'Drama')
INSERT [dbo].[Genre] ([ID], [Name]) VALUES (3, N'Horror')
INSERT [dbo].[Genre] ([ID], [Name]) VALUES (4, N'Action')
INSERT [dbo].[Genre] ([ID], [Name]) VALUES (5, N'Adventure')
INSERT [dbo].[Genre] ([ID], [Name]) VALUES (6, N'Comedy')
INSERT [dbo].[Genre] ([ID], [Name]) VALUES (7, N'Fantasy')
INSERT [dbo].[Genre] ([ID], [Name]) VALUES (8, N'Romance')
SET IDENTITY_INSERT [dbo].[Genre] OFF
GO
INSERT [dbo].[GenreMovie] ([GenresID], [MoviesID]) VALUES (1, 1)
INSERT [dbo].[GenreMovie] ([GenresID], [MoviesID]) VALUES (2, 1)
INSERT [dbo].[GenreMovie] ([GenresID], [MoviesID]) VALUES (3, 1)
INSERT [dbo].[GenreMovie] ([GenresID], [MoviesID]) VALUES (2, 2)
INSERT [dbo].[GenreMovie] ([GenresID], [MoviesID]) VALUES (4, 2)
INSERT [dbo].[GenreMovie] ([GenresID], [MoviesID]) VALUES (5, 2)
INSERT [dbo].[GenreMovie] ([GenresID], [MoviesID]) VALUES (1, 3)
INSERT [dbo].[GenreMovie] ([GenresID], [MoviesID]) VALUES (2, 3)
INSERT [dbo].[GenreMovie] ([GenresID], [MoviesID]) VALUES (5, 4)
INSERT [dbo].[GenreMovie] ([GenresID], [MoviesID]) VALUES (6, 4)
INSERT [dbo].[GenreMovie] ([GenresID], [MoviesID]) VALUES (7, 4)
INSERT [dbo].[GenreMovie] ([GenresID], [MoviesID]) VALUES (2, 5)
INSERT [dbo].[GenreMovie] ([GenresID], [MoviesID]) VALUES (6, 5)
INSERT [dbo].[GenreMovie] ([GenresID], [MoviesID]) VALUES (8, 5)
INSERT [dbo].[GenreMovie] ([GenresID], [MoviesID]) VALUES (1, 6)
INSERT [dbo].[GenreMovie] ([GenresID], [MoviesID]) VALUES (2, 6)
INSERT [dbo].[GenreMovie] ([GenresID], [MoviesID]) VALUES (3, 6)
GO
