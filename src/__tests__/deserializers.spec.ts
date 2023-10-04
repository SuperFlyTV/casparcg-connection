// import { Version } from '../enums'
import { Commands } from '../commands'
import { deserializers } from '../deserializers'
import { LogLevel, Version } from '../enums'
import { literal } from '../lib'
import { ConsumerType, InfoChannelEntry, InfoConfig, InfoEntry } from '../parameterAndReturnTypes'

describe('deserializers', () => {
	it('should deserialize CINF', async () => {
		// "AMB" MOVIE size datetime frames rate
		const input = '"AMB" MOVIE 1234 20230609070542 12 1/25'

		const output = await deserializers[Commands.Cinf]([input])

		expect(output).toMatchObject({
			clip: 'AMB',
			type: 'MOVIE',
			size: 1234,
			datetime: new Date(2023, 5, 9, 7, 5, 42).getTime(),
			frames: 12,
			framerate: 25,
		})
	})

	it('should deserialize CLS', async () => {
		// "AMB" MOVIE size datetime frames rate
		const input = ['"AMB" MOVIE 1234 20230609070542 19876 1/50', '"AMB2" MOVIE 2345 20230609070543 29876 1/60']

		const output = await deserializers[Commands.Cls](input)

		expect(output).toHaveLength(2)
		expect(output[0]).toMatchObject({
			clip: 'AMB',
			type: 'MOVIE',
			size: 1234,
			datetime: new Date(2023, 5, 9, 7, 5, 42).getTime(),
			frames: 19876,
			framerate: 50,
		})
		expect(output[1]).toMatchObject({
			clip: 'AMB2',
			type: 'MOVIE',
			size: 2345,
			datetime: new Date(2023, 5, 9, 7, 5, 43).getTime(),
			frames: 29876,
			framerate: 60,
		})
	})

	it('should deserialize VERSION for 2.1', async () => {
		const input = ['2.1.0.f207a33 STABLE']

		const output = await deserializers[Commands.Version](input)

		expect(output).toMatchObject({
			version: Version.v21x,
			fullVersion: '2.1.0.f207a33 STABLE',
		})
	})
	it('should deserialize VERSION for 2.2', async () => {
		const input = ['2.2.0.f207a33 STABLE']

		const output = await deserializers[Commands.Version](input)

		expect(output).toMatchObject({
			version: Version.v22x,
			fullVersion: '2.2.0.f207a33 STABLE',
		})
	})
	it('should deserialize VERSION for 2.3', async () => {
		const input = ['2.3.0.f207a33 STABLE']

		const output = await deserializers[Commands.Version](input)

		expect(output).toMatchObject({
			version: Version.v23x,
			fullVersion: '2.3.0.f207a33 STABLE',
		})
	})
	it('should be unsupported VERSION for 2.0', async () => {
		const input = ['2.0.7.f207a33 STABLE']

		const output = await deserializers[Commands.Version](input)

		expect(output).toMatchObject({
			version: Version.Unsupported,
			fullVersion: '2.0.7.f207a33 STABLE',
		})
	})
	it('should deserialize VERSION for 2.4 into 2.3', async () => {
		const input = ['2.4.0.f207a33 STABLE']

		const output = await deserializers[Commands.Version](input)

		expect(output).toMatchObject({
			version: Version.v23x,
			fullVersion: '2.4.0.f207a33 STABLE',
		})
	})
	it('should deserialize INFO', async () => {
		const input = ['1 720p5000 PLAYING', '2 1080i5000 PLAYING']

		const output = await deserializers[Commands.Info](input)

		expect(output).toHaveLength(2)
		expect(output[0]).toMatchObject(
			literal<InfoEntry>({
				channel: 1,
				format: 720,
				channelRate: 50,
				frameRate: 50,
				interlaced: false,
				status: 'PLAYING',
			})
		)
		expect(output[1]).toMatchObject(
			literal<InfoEntry>({
				channel: 2,
				format: 1080,
				channelRate: 50,
				frameRate: 50,
				interlaced: true,
				status: 'PLAYING',
			})
		)
	})
	it('should deserialize INFO Channel', async () => {
		const input = [
			`<?xml version="1.0" encoding="utf-8"?>
		<channel>
		   <framerate>50</framerate>
		   <framerate>1</framerate>
		   <mixer>
			  <audio>
				 <volume>0</volume>
				 <volume>0</volume>
				 <volume>0</volume>
				 <volume>0</volume>
				 <volume>0</volume>
				 <volume>0</volume>
				 <volume>0</volume>
				 <volume>0</volume>
			  </audio>
		   </mixer>
		   <stage>
			  <layer>
				 <layer_10>
					<background>
					   <producer>empty</producer>
					</background>
					<foreground>
					   <file>
						  <clip>0</clip>
						  <clip>596.48000000000002</clip>
						  <name>AMB.mp4</name>
						  <path>media/AMB.mp4</path>
						  <streams>
							 <file>
								<streams_0>
								   <fps>0</fps>
								   <fps>0</fps>
								</streams_0>
								<streams_1>
								   <fps>24</fps>
								   <fps>1</fps>
								</streams_1>
							 </file>
						  </streams>
						  <time>288.80000000000001</time>
						  <time>596.48000000000002</time>
					   </file>
					   <loop>false</loop>
					   <paused>true</paused>
					   <producer>ffmpeg</producer>
					</foreground>
				 </layer_10>
			  </layer>
		   </stage>
		</channel>`,
		]

		const output = await deserializers[Commands.InfoChannel](input)

		expect(output).toMatchObject(
			literal<InfoChannelEntry>({
				channel: {
					framerate: 50,
					mixer: {
						audio: {
							volumes: [0, 0, 0, 0, 0, 0, 0, 0],
						},
					},

					layers: [
						{
							layer: 10,
							background: expect.anything(),
							foreground: expect.anything(),
						},
					],
				},
			})
		)
	})
	it('should deserialize INFO Config', async () => {
		const input = [
			`<?xml version="1.0" encoding="utf-8"?>

			<configuration>
				<log-level>debug</log-level>
				<paths>
					<media-path>media/</media-path>
					<log-path>log/</log-path>
					<data-path>data/</data-path>
					<template-path>templates/</template-path>
				</paths>
				<lock-clear-phrase>secret</lock-clear-phrase>
				<channels>
					<channel>
						<video-mode>1080p5000</video-mode>
						<consumers>
							<screen>
								<device>1</device>
								<aspect-ratio>default</aspect-ratio>
								<stretch>fill</stretch>
								<windowed>true</windowed>
							</screen>
						</consumers>
					</channel>
					<channel>
						<video-mode>1080p2500</video-mode>
						<consumers>
							<decklink>
								<device>1</device>
								<latency>normal</latency>
							</screen>
						</consumers>
					</channel>
				</channels>
				<controllers>
					<tcp>
						<port>5250</port>
						<protocol>AMCP</protocol>
					</tcp>
				</controllers>
				<amcp>
					<media-server>
						<host>localhost</host>
						<port>8000</port>
					</media-server>
				</amcp>
			</configuration>`,
		]

		const output = await deserializers[Commands.InfoConfig](input)

		expect(output).toMatchObject(
			literal<InfoConfig>({
				logLevel: LogLevel.Debug,
				paths: {
					media: 'media/',
					data: 'data/',
					log: 'log/',
					template: 'template/',
				},
				channels: [
					{
						videoMode: '1080p5000',
						consumers: [
							{
								type: ConsumerType.SCREEN,
								device: 1,
								aspectRatio: 'default',
								windowed: true,
							},
						],
					},
					{
						videoMode: '1080p2500',
						consumers: [
							{
								type: ConsumerType.DECKLINK,
								device: 1,
								latency: 'normal',
							},
						],
					},
				],
				controllers: {
					tcp: {
						port: 5250,
						protocol: 'AMCP',
					},
				},
				amcp: {
					mediaServer: {
						host: 'localhost',
						port: 8000,
					},
				},
				rawXml: input[0],
			})
		)
	})
})
